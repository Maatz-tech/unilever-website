"""
Recorta os assets do hero exatamente na janela visível definida no Figma.

No Figma cada foto é uma <img> maior, posicionada dentro de um container com
overflow hidden (ex.: left:-44.9% top:-125% width:378% height:199%). Em vez de
carregar a imagem inteira e replicar esse posicionamento no CSS, este script
pré-recorta o pedaço visível. Resultado: cada arquivo mapeia 1:1 com seu
container, o CSS vira `inset-0 size-full`, e nenhum pixel invisível é baixado.

Uso: python3 scripts/hero-assets.py
"""

from PIL import Image

SRC = '/tmp/claude-501/hero'
OUT = 'public/images/hero'
MAX_DPR = 2  # não exportar acima de 2x

# nome, arquivo, container (w,h) em px CSS, img (left%, top%, w%, h%)
LAYERS = [
    # --- fundos (container = hero-wrap 1392x640) ---
    ('bg-1', 'bg-1', (1392, 640), (0, 0, 100, 100)),  # object-cover simples
    ('bg-2', 'bg-2', (1392, 640), (-14.15, 0, 137.99, 133.39)),
    ('bg-3', 'bg-3', (1392, 640), (-27.33, -21.65, 187.96, 181.70)),
    ('bg-4', 'bg-4', (1392, 640), (-8.15, -28.75, 120.55, 174.81)),
    ('bg-5', 'bg-5', (1392, 640), (0.01, 0, 99.98, 100)),
    # --- pessoas recortadas ---
    ('pes-1', 'pes-1', (584.261, 809.493), (-24.28, -20.57, 138.56, 149.94)),
    # pes-2 NÃO entra aqui: a fonte vem rotacionada 90° do Figma e o recorte
    # cai em área transparente. Esse slide usa o render pronto do Figma,
    # copiado à parte em public/images/hero/pes-2.webp. Ver PROJECT.md.
    ('pes-3', 'pes-3', (584.261, 809.493), (-28.87, -20.63, 157.74, 170.69)),
    ('pes-4', 'pes-4', (584.261, 809.493), (-168.91, -51.26, 471.89, 227.09)),
    ('pes-5', 'pes-5', (584.261, 809.493), (0, -9.43, 105.63, 114.31)),

    # --- MOBILE (container = slide 390x672) ---
    # Cada slide mobile tem asset e recorte próprios — não dá pra derivar do
    # desktop (tentei, e os fundos 2-5 saíram errados). O slide 1 é object-cover
    # simples, expresso aqui como placement equivalente (escala 1.05, centrado).
    ('bg-1-m', 'mbg-1', (390, 672), (-143.85, 0, 387.69, 100)),
    ('bg-2-m', 'mbg-2', (390, 672), (-198.22, 0, 387.69, 100)),
    ('bg-3-m', 'mbg-3', (390, 672), (-101.38, 0, 387.69, 100)),
    ('bg-4-m', 'mbg-4', (390, 672), (0, -7.81, 278.62, 107.81)),
    ('bg-5-m', 'mbg-5', (390, 672), (-98.23, 0, 374.72, 100)),
    # Pessoas: slides 1, 3 e 4 usam recorte idêntico ao desktop (reaproveitam o
    # arquivo). O slide 5 tem recorte levemente diferente e o 2 usa o render do
    # Figma (fonte rotacionada — ver PROJECT.md).
    ('pes-5-m', 'mpes-5', (370, 512.635), (2.25, -9.43, 101.12, 109.43)),
]


def build(name, src_file, container, placement):
    cw, ch = container
    left_pct, top_pct, w_pct, h_pct = placement

    src = Image.open(f'{SRC}/{src_file}').convert('RGBA')

    # posição/tamanho da img em px CSS (percentuais são relativos ao container)
    img_w = cw * w_pct / 100
    img_h = ch * h_pct / 100
    left = cw * left_pct / 100
    top = ch * top_pct / 100

    # não faz sentido exportar acima da resolução que a fonte oferece
    scale = min(MAX_DPR, src.width / img_w)

    canvas = Image.new('RGBA', (round(cw * scale), round(ch * scale)), (0, 0, 0, 0))
    resized = src.resize((round(img_w * scale), round(img_h * scale)), Image.LANCZOS)
    canvas.paste(resized, (round(left * scale), round(top * scale)), resized)

    # fundos não têm transparência — RGB gera arquivo bem menor
    opaque = name.startswith('bg')
    if opaque:
        flat = Image.new('RGB', canvas.size, (0, 0, 0))
        flat.paste(canvas, mask=canvas.split()[3])
        canvas = flat

    path = f'{OUT}/{name}.webp'
    canvas.save(path, 'WEBP', quality=92, method=6)
    print(f'{name:8} {canvas.size[0]:5}x{canvas.size[1]:<5} scale={scale:.2f}')


for layer in LAYERS:
    build(*layer)
