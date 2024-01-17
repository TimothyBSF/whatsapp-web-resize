let dy = 0,
    x = 0,
    y = 0,
    ht = 0;
let resizer: HTMLElement | null = null;
let innerTextBox: HTMLElement | null = null;
let initialHeight = 0;

function init() {
    // THX: https://www.lazytechlead.com/whatsapp-web-chrome-extension/
    const observer = new MutationObserver(() => {
        const mainNode = document.body.querySelector("#main");

        if (!mainNode?.parentNode) {
            return;
        }

        resizer = document.body.querySelector("._3Uu1_");
        innerTextBox = document.body.querySelector('.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt[tabindex="10"]');

        if (resizer && !resizer.classList.contains("badassResizer1337H4x0r")) {
            initialHeight = resizer.clientHeight;
            //THX:https://stackoverflow.com/a/35705115/5435450
            resizer.removeEventListener("mousedown", addListener);
            resizer.addEventListener("mousedown", addListener);
            resizer.classList.add("badassResizer1337H4x0r");
        }
    });

    observer.observe(document.body, { subtree: true, childList: true });
}

function addListener(event: MouseEvent) {
    startResize(event);
    document.body.addEventListener("mousemove", resize);
    document.body.addEventListener("mouseup", (_) =>  document.body.removeEventListener("mousemove", resize), { once: true });
}


function startResize(event: MouseEvent) {
    x = event.screenX;
    y = event.screenY;
}

function resize(event: MouseEvent) {
    dy = event.screenY - y;
    y = event.screenY;
    ht -= dy;

    const heightLeft = document.querySelector("._3B19s")?.clientHeight ?? 1;

    if (ht > initialHeight && resizer && innerTextBox && (heightLeft > 0 || ht <= resizer.clientHeight)) {
        resizer.style.height = ht + "px";
        innerTextBox.style.maxHeight = (ht - calculateMarginSize(resizer)) + "px";
    }
}

//THX: https://chat.openai.com
function calculateMarginSize(element: HTMLElement) {
    const styles = window.getComputedStyle(element);
    const marginTop = parseInt(styles.marginTop, 10) || 0;
    const marginBottom = parseInt(styles.marginBottom, 10) || 0;
    const marginLeft = parseInt(styles.marginLeft, 10) || 0;
    const marginRight = parseInt(styles.marginRight, 10) || 0;

    return marginTop + marginBottom + marginLeft + marginRight;
}

init();
