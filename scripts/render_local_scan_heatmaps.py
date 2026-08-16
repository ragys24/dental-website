from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap

OUTPUT = Path("/home/ubuntu/apex-dental/local-scan-heatmaps-2026-08-14.png")

# Source: user-supplied Local Falcon map scans dated 2026-08-14.
# 21 represents Local Falcon's displayed "20+" (outside top 20).
near_me = np.full((7, 7), 21, dtype=int)
near_me[3, 3] = 2

garden_grove = np.array(
    [
        [12, 15, 20, 21, 21, 21, 21],
        [7, 10, 13, 17, 21, 21, 21],
        [6, 9, 11, 12, 21, 21, 21],
        [7, 8, 8, 7, 18, 21, 21],
        [8, 8, 11, 11, 21, 21, 21],
        [7, 11, 10, 19, 21, 21, 21],
        [16, 20, 21, 21, 21, 21, 21],
    ],
    dtype=int,
)


def classify(value: int) -> int:
    if value <= 3:
        return 0
    if value <= 10:
        return 1
    if value <= 20:
        return 2
    return 3


def draw_grid(ax, values: np.ndarray, title: str, subtitle: str) -> None:
    classifications = np.vectorize(classify)(values)
    cmap = ListedColormap(["#057a55", "#d9a441", "#d36b35", "#9f3a38"])
    ax.imshow(classifications, cmap=cmap, vmin=0, vmax=3)

    for row in range(values.shape[0]):
        for col in range(values.shape[1]):
            value = values[row, col]
            label = "20+" if value == 21 else str(value)
            ax.text(col, row, label, ha="center", va="center", fontsize=13, fontweight="bold", color="white")

    ax.scatter(3, 3, s=260, facecolors="none", edgecolors="white", linewidths=2.4, zorder=3)
    ax.text(3, 3.58, "Uplift center", ha="center", va="top", fontsize=8.5, color="white", fontweight="bold")
    ax.set_title(title, fontsize=17, fontweight="bold", color="#063f3a", pad=20)
    ax.text(0.5, 1.02, subtitle, transform=ax.transAxes, ha="center", fontsize=10.5, color="#53606a")
    ax.set_xticks(range(7), ["W-3", "W-2", "W-1", "Center", "E+1", "E+2", "E+3"])
    ax.set_yticks(range(7), ["N+3", "N+2", "N+1", "Center", "S-1", "S-2", "S-3"])
    ax.tick_params(length=0, labelsize=8.5)
    ax.set_xlabel("West ← 1.67 miles between scan pins → East", fontsize=9.5, labelpad=11)
    ax.set_ylabel("North ← scan rows → South", fontsize=9.5, labelpad=11)
    ax.set_xticks(np.arange(-0.5, 7, 1), minor=True)
    ax.set_yticks(np.arange(-0.5, 7, 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.8)
    ax.tick_params(which="minor", bottom=False, left=False)


plt.rcParams.update({"font.family": "DejaVu Sans"})
fig, axes = plt.subplots(1, 2, figsize=(17, 8.6), facecolor="#f7f4ef")
fig.subplots_adjust(top=0.77, bottom=0.2, wspace=0.3)

draw_grid(
    axes[0],
    near_me,
    "“Dentist near me”",
    "ARP 2.00 · ATRP 20.61 · SoLV 2.04% · 1 of 49 points in the top 20",
)
draw_grid(
    axes[1],
    garden_grove,
    "“Dentist Garden Grove”",
    "ARP 11.58 · ATRP 16.00 · SoLV 0.00% · 26 of 49 points in the top 20",
)

fig.suptitle(
    "Uplift Dental & Orthodontics — Google Maps Local Visibility Baseline",
    fontsize=22,
    fontweight="bold",
    color="#063f3a",
    y=0.96,
)
fig.text(
    0.5,
    0.905,
    "Local Falcon 7×7 scans · 5-mile radius · August 14, 2026 · Rankings are provider snapshots, not a permanent or universal result",
    ha="center",
    fontsize=10.5,
    color="#53606a",
)

legend_items = [
    ("#057a55", "Top 3"),
    ("#d9a441", "Ranks 4–10"),
    ("#d36b35", "Ranks 11–20"),
    ("#9f3a38", "20+ / not in top 20"),
]
for index, (color, label) in enumerate(legend_items):
    x = 0.22 + index * 0.155
    fig.add_artist(plt.Rectangle((x, 0.095), 0.015, 0.02, transform=fig.transFigure, color=color, clip_on=False))
    fig.text(x + 0.021, 0.1, label, fontsize=10.5, color="#263238", va="bottom")

fig.text(
    0.5,
    0.045,
    "Important: the supplied scans are for “dentist near me” and “dentist Garden Grove.” A separate exact scan is still required for “best dentist near me.”",
    ha="center",
    fontsize=10.5,
    color="#7a3c2f",
    fontweight="bold",
)

fig.savefig(OUTPUT, dpi=200, bbox_inches="tight", facecolor=fig.get_facecolor())
print(OUTPUT)
