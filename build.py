from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
root=Path(__file__).parent
s=(root/'src/shell.html').read_text()
for name in ('core','art','app'):
 s=s.replace('/*'+name.upper()+'*/',(root/'src'/f'{name}.js').read_text())
(root/'index.html').write_text(s)
(root/'dist').mkdir(exist_ok=True)
(root/'dist/index.html').write_text(s)
with ZipFile(root/'forest-pinball-yandex.zip','w',ZIP_DEFLATED) as z:z.write(root/'dist/index.html','index.html')
print(f'Built standalone HTML and Yandex ZIP: {len(s.encode())} bytes')
