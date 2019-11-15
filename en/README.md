# Synaptic WEB

:warning: Push to `master` branch then deploy in https://www.synaptic.cl/.

:warning: Push to `develop` bash then deploy to https://storage.googleapis.com/beta.synaptic.cl/index.html


# How create qr image

This script use team.json for create qr images

```bash
docker run --rm -ti -v $(pwd)/:/app python:3 /bin/bash -c "pip install 'qrcode[pil]' && cd /app/ && python create_qr.py"
```


## Develop

```bash
python -m SimpleHTTPServer 8080
```

Go to http://localhost:8080/
