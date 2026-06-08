"""Shared helpers for gpt-image-2 calls.
Use from any sibling script with `from _lib_openai_image import ...`.
"""
import base64
import json
import mimetypes
import os
import time
import uuid
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")


def load_key():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API_KEY"):
                _, _, v = line.partition("=")
                return v.strip().strip('"').strip("'")
    raise RuntimeError("OPENAI_API_KEY missing")


def generate(prompt, *, size="1024x1536", quality="high", out_path,
             output_format="webp", output_compression=90, timeout=420):
    """Plain text-to-image via /v1/images/generations."""
    body = {
        "model": "gpt-image-2",
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "output_format": output_format,
        "output_compression": output_compression,
        "n": 1,
    }
    req = Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {load_key()}",
                 "Content-Type": "application/json"},
        method="POST",
    )
    t0 = time.time()
    try:
        with urlopen(req, timeout=timeout) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:400]}",
                "secs": round(time.time() - t0, 1)}
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"ok": True, "path": out_path,
            "bytes": os.path.getsize(out_path),
            "secs": round(time.time() - t0, 1)}


def _multipart(fields, files):
    """Build a multipart/form-data body. fields: dict[str, str], files: list[(name, filename, bytes, mime)]."""
    boundary = uuid.uuid4().hex
    parts = []
    for k, v in fields.items():
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode("utf-8"))
    for name, filename, data, mime in files:
        head = (f"--{boundary}\r\n"
                f"Content-Disposition: form-data; name=\"{name}\"; filename=\"{filename}\"\r\n"
                f"Content-Type: {mime}\r\n\r\n").encode("utf-8")
        parts.append(head + data + b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode("utf-8"))
    return b"".join(parts), boundary


def edit(image_path, prompt, *, size="1024x1536", quality="high", out_path,
         output_format="webp", output_compression=90, timeout=420):
    """Image-to-image via /v1/images/edits. Single reference image."""
    with open(image_path, "rb") as f:
        img_bytes = f.read()
    mime, _ = mimetypes.guess_type(image_path)
    if mime is None:
        mime = "image/png"
    fields = {
        "model": "gpt-image-2",
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "output_format": output_format,
        "output_compression": str(output_compression),
        "n": "1",
    }
    files = [("image", os.path.basename(image_path), img_bytes, mime)]
    body, boundary = _multipart(fields, files)
    req = Request(
        "https://api.openai.com/v1/images/edits",
        data=body,
        headers={"Authorization": f"Bearer {load_key()}",
                 "Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    t0 = time.time()
    try:
        with urlopen(req, timeout=timeout) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:400]}",
                "secs": round(time.time() - t0, 1)}
    except URLError as e:
        return {"ok": False, "error": f"URL: {e.reason}", "secs": round(time.time() - t0, 1)}
    if not payload.get("data") or not payload["data"][0].get("b64_json"):
        return {"ok": False, "error": f"empty: {json.dumps(payload)[:300]}",
                "secs": round(time.time() - t0, 1)}
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"ok": True, "path": out_path,
            "bytes": os.path.getsize(out_path),
            "secs": round(time.time() - t0, 1)}
