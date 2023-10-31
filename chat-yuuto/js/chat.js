const input = document.querySelector("#input");
const send = document.querySelector("#send");
const clear = document.querySelector("#clear");
const board = document.querySelector("#board");
const submitBox = document.querySelector("#submitBox");
let boardHeight = parseInt(window.getComputedStyle(board).height);
let boardWidth = parseInt(window.getComputedStyle(board).width);

console.log(boardHeight);

let clickCount = 10;

input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || e.isComposing) return;
    send.click();
    input.value = "";
});

send.addEventListener("click", () => {
    if (input.value == "") return;
    let postWrapArray = [];
    for (let i = 0; i < 15; i++) {
        let postWrap = document.createElement("div");
        postWrap.classList.add("postWrap");
        board.append(postWrap);
        let post = document.createElement("div");
        post.classList.add("post");
        postWrap.appendChild(post);
        let closeBtn = document.createElement("div");
        closeBtn.classList.add("closeBtn");
        postWrap.appendChild(closeBtn);
        let date = document.createElement("p");
        date.classList.add("date");
        postWrap.appendChild(date);
        date.textContent = new Date().toLocaleString();
        post.textContent = input.value;
        const rgbMin = 200;
        post.style.backgroundColor =
        "rgb(" +
        (rgbMin + (256 - rgbMin) * Math.random()) +
        ", " +
        (rgbMin + (256 - rgbMin) * Math.random()) +
        ", " +
        (rgbMin + (256 - rgbMin) * Math.random()) +
        ")";
        clickCount += 1;
        postWrap.style.zIndex = clickCount;
        // postWrap.style.display = "none"
        postWrapArray.push(postWrap);
    }




    
    let delay = 0; // Độ trễ ban đầu
    const delayIncrement = 50; // Tăng cứng mỗi lần
    
    // Tạo hiệu ứng tịnh tiến với độ trễ
    postWrapArray.forEach((postWrap, index) => {
        setTimeout(() => {
            let postWrapHeight = parseInt(window.getComputedStyle(postWrap).height);
            let postWrapWidth = parseInt(window.getComputedStyle(postWrap).width);

            postWrap.style.top =
                Math.random() * (boardHeight - postWrapHeight) + "px";
            postWrap.style.left =
                Math.random() * (boardWidth - postWrapWidth) + "px";
                if (index > 0) {
                    let top = parseFloat(postWrapArray[index - 1].style.top) + 20 + "px";
                    let left = parseFloat(postWrapArray[index - 1].style.left) + 20 + "px";
                    postWrap.style.top = top;
                    postWrap.style.left = left;
                    // postWrap.style.display = "block"

                }    
            // ...
        }, delay);

        delay += delayIncrement; // Tăng độ trễ cho lần tiếp theo
    });


    let flg = false;

    postWrap.addEventListener("mousedown", () => (flg = true));
    window.addEventListener("mouseup", () => (flg = false));

    postWrap.addEventListener("click", () => {
        clickCount += 1;
        console.log(clickCount);
    });


    clear.classList.add("active");

    // document.addEventListener("mousemove", (e) => {
    //     if (!flg) return;
    //     postWrap.style.top = e.clientY - postWrapHeight / 2 + "px";
    //     postWrap.style.left = e.clientX - postWrapWidth / 2 + "px";
    // });

    let offsetX, offsetY;

    // document.addEventListener("mousemove", (e) => {
    window.addEventListener("mousemove", (e) => {
        if (!flg) return;
        postWrap.style.top = e.clientY - offsetY + "px";
        postWrap.style.left = e.clientX - offsetX + "px";
    });

    postWrap.addEventListener("mousedown", (e) => {
        flg = true;
        offsetX = e.clientX - parseInt(postWrap.style.left);
        offsetY = e.clientY - parseInt(postWrap.style.top);
        postWrap.style.zIndex = clickCount;
    });

    clear.addEventListener("click", () => {
        clear.classList.remove("active");
        board.textContent = "";
        input.value = "";
    });

    closeBtn.addEventListener("click", () => {
        postWrap.remove();
        if (board.textContent == "") {
            clear.classList.remove("active");
        }
    });
    input.value = "";
});
