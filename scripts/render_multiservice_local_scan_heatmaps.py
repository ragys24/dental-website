from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap


OUTPUT = Path("/home/ubuntu/webdev-static-assets/uplift-local-seo-reports/local-scan-heatmaps-multiservice-2026-08-14.png")
OUTSIDE_TOP_20 = 21

# Source: the four user-supplied Local Falcon maps dated August 14, 2026.
near_me = np.full((7, 7), OUTSIDE_TOP_20, dtype=int)
near_me[3, 3] = 2

garden_grove = np.array([
    [12, 15, 20, 21, 21, 21, 21],
    [7, 10, 13, 17, 21, 21, 21],
    [6, 9, 11, 12, 21, 21, 21],
    [7, 8, 8, 7, 18, 21, 21],
    [8, 8, 11, 11, 21, 21, 21],
    [7, 11, 10, 19, 21, 21, 21],
    [16, 20, 21, 21, 21, 21, 21],
], dtype=int)

braces = np.full((7, 7), OUTSIDE_TOP_20, dtype=int)
braces[3, 3] = 2
braces[3, 4] = 6

invisalign = np.full((7, 7), OUTSIDE_TOP_20, dtype=int)
invisalign[2, 3:6] = [10, 8, 14]
invisalign[3, 2:6] = [13, 1, 3, 18]
invisalign[4, 2:5] = [10, 3, 11]
invisalign[5, 1:4] = [10, 9, 11]


def classify(value: int) -> int:
    if value <= 3:
        return 0
    if value <= 10:
        return 1
    if value <= 20:
        return 2
    return 3


def draw_grid(ax, values: np.ndarray, title: str, metrics: str) -> None:
    ax.imshow(np.vectorize(classify)(values), cmap=ListedColormap(["#057a55", "#d9a441", "#d36b35", "#9f3a38"]), vmin=0, vmax=3)
    for row in range(7):
        for col in range(7):
            value = values[row, col]
            ax.text(col, row, "20+" if value == OUTSIDE_TOP_20 else str(value), ha="center", va="center", fontsize=9, fontweight="bold", color="white")
    ax.scatter(3, 3, s=178, facecolors="none", edgecolors="white", linewidths=2.1, zorder=3)
    ax.set_title(title, fontsize=15, fontweight="bold", color="#063f3a", pad=19)
    ax.text(0.5, 1.01, metrics, transform=ax.transAxes, ha="center", fontsize=8.7, color="#53606a")
    ax.set_xticks(range(7), ["W3", "W2", "W1", "Center", "E1", "E2", "E3"])
    ax.set_yticks(range(7), ["N3", "N2", "N1", "Center", "S1", "S2", "S3"])
    ax.tick_params(length=0, labelsize=7.5)
    ax.set_xticks(np.arange(-0.5, 7, 1), minor=True)
    ax.set_yticks(np.arange(-0.5, 7, 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.5)
    ax.tick_params(which="minor", bottom=False, left=False)


plt.rcParams.update({"font.family": "DejaVu Sans"})
fig, axes = plt.subplots(2, 2, figsize=(15.5, 14), facecolor="#f7f4ef")
fig.subplots_adjust(top=0.86, bottom=0.13, wspace=0.2, hspace=0.34)

draw_grid(axes[0, 0], near_me, "“Dentist near me”", "ARP 2.00 · ATRP 20.61 · SoLV 2.04% · 1/49 top-20 points")
draw_grid(axes[0, 1], garden_grove, "“Dentist Garden Grove”", "ARP 11.58 · ATRP 16.00 · SoLV 0.00% · 26/49 top-20 points")
draw_grid(axes[1, 0], braces, "“Braces”", "ARP 4.00 · ATRP 20.31 · SoLV 2.04% · 2/49 top-20 points")
draw_grid(axes[1, 1], invisalign, "“Invisalign”", "ARP 9.31 · ATRP 17.90 · SoLV 6.12% · 13/49 top-20 points")

fig.suptitle("Uplift Dental & Orthodontics — Google Maps Local Visibility Baseline", fontsize=22, fontweight="bold", color="#063f3a", y=0.97)
fig.text(0.5, 0.935, "Local Falcon 7×7 scans · 5-mile radius · 1.67 miles between pins · August 14, 2026", ha="center", fontsize=10.5, color="#53606a")

legend = [("#057a55", "Top 3"), ("#d9a441", "Ranks 4–10"), ("#d36b35", "Ranks 11–20"), ("#9f3a38", "20+ / not in top 20")]
for index, (color, label) in enumerate(legend):
    x = 0.21 + index * 0.16
    fig.add_artist(plt.Rectangle((x, 0.08), 0.014, 0.015, transform=fig.transFigure, color=color, clip_on=False))
    fig.text(x + 0.019, 0.08, label, fontsize=9.5, color="#263238", va="bottom")

fig.text(0.5, 0.04, "White ring = Uplift’s business center. “Best dentist near me” was not among the supplied scan keywords and requires its own exact-match scan.", ha="center", fontsize=9.4, color="#7a3c2f", fontweight="bold")
fig.savefig(OUTPUT, dpi=220, bbox_inches="tight", facecolor=fig.get_facecolor())
print(OUTPUT)
