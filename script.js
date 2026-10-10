const face = document.getElementById("face");
const drink = document.getElementById("drink");
const bg = document.getElementById("bg");
const statusText = document.getElementById("status");

let currentExpression = "happy";
let currentFlavor = "#c89563";
let currentBg = "#fdf6ec";

const expressions = {
    happy: `
        <circle cx="43" cy="53" r="1.7" fill="#302016"/>
        <circle cx="57" cy="53" r="1.7" fill="#302016"/>
        <path d="M45 59 Q50 65 55 59" fill="none" stroke="#302016" stroke-width="0.5"/>
    `,
    chill: `
        <path d="M39 53 H46 M54 53 H61" stroke="#302016" stroke-width="1.5"/>
        <path d="M47 60 H53" stroke="#302016" stroke-width="1"/>
    `,
    surprised: `
        <circle cx="43" cy="53" r="1.8" fill="#302016"/>
        <circle cx="57" cy="53" r="1.8" fill="#302016"/>
        <ellipse cx="50" cy="61" rx="2.8" ry="3.5" fill="#302016"/>
    `,
    cool: `
        <path d="M36 50 H47 L45 56 H38 Z" fill="#302016"/>
        <path d="M53 50 H64 L62 56 H55 Z" fill="#302016"/>
        <path d="M47 52 H53" stroke="#302016"/>
        <path d="M47 61 Q51 63 55 60" stroke="#302016" fill="none"/>
    `,
    wink: `
        <circle cx="43" cy="53" r="1.7" fill="#302016"/>
        <path d="M54 53 Q57 56 60 52" stroke="#302016" stroke-width="1.5" fill="none"/>
        <path d="M45 60 Q50 64 55 59" stroke="#302016" stroke-width="0.5" fill="none"/>
    `,
    sleepy: `
        <path d="M39 53 Q43 56 47 53" stroke="#302016" fill="none"/>
        <path d="M53 53 Q57 56 61 53" stroke="#302016" fill="none"/>
        <path d="M47 61 Q50 63 53 61" stroke="#302016" fill="none"/>
    `
};

const expressionButtons = document.querySelectorAll("#expressions button");

expressionButtons.forEach(button => {
    button.addEventListener("click", () => {
        expressionButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        currentExpression = button.getAttribute("data-face");
        face.innerHTML = expressions[currentExpression];
    });
});

const flavorButtons = document.querySelectorAll("#flavors button");

flavorButtons.forEach(button => {
    button.addEventListener("click", () => {
        flavorButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        currentFlavor = button.getAttribute("data-color");
        drink.setAttribute("fill", currentFlavor);
    });
});

const bgButtons = document.querySelectorAll("#backgrounds button");

bgButtons.forEach(button => {
    button.addEventListener("click", () => {
        bgButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        currentBg = button.getAttribute("data-bg");
        bg.setAttribute("fill", currentBg);
    });
});

function svgToImage(svgElement) {
    return new Promise((resolve, reject) => {
        const serialized = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = url;
    });
}

document.getElementById("download").addEventListener("click", async () => {
    const btn = document.getElementById("download");
    btn.textContent = "Loading...";
    statusText.textContent = "Making your avatar...";

    try {
        const svg = document.getElementById("avatar");
        const image = await svgToImage(svg);

        const canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 700;
        const ctx = canvas.getContext("2d");
        
        ctx.drawImage(image, 0, 0, 700, 700);

        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            
            link.href = url;
            link.download = "my-boba-avatar.png";
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            statusText.textContent = "Done! Check your downloads 🧋";
            btn.textContent = "Download Avatar PNG";
        });

    } catch (err) {
        console.log(err);
        statusText.textContent = "Error downloading :(";
        btn.textContent = "Try Again";
    }
});
