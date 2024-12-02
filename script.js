document.addEventListener("DOMContentLoaded", () => {
    const typingTexts = document.querySelectorAll(".typing-text");
    const icons = document.querySelectorAll(".icon");
    const sections = document.querySelectorAll(".section");
    const projectItems = document.querySelectorAll(".projects-list li");

    typingTexts.forEach((text) => {
        text.style.visibility = "hidden";
    });

    projectItems.forEach((item) => {
        item.style.visibility = "hidden";
    });

    function typeText(index, onComplete) {
        const typingText = typingTexts[index];
        const section = typingText.closest(".section");
        const originalHTML = typingText.innerHTML;
        const container = document.createElement("div");
        container.innerHTML = originalHTML;

        typingText.innerHTML = "";
        let charIndex = 0;

        typingText.style.visibility = "visible";

        function type() {
            const currentChar = container.innerHTML[charIndex];

            if (charIndex < container.innerHTML.length) {
                typingText.innerHTML += currentChar;
                typingText.innerHTML = container.innerHTML.slice(0, charIndex + 1);
                adjustSectionHeight(section);
                charIndex++;
                setTimeout(type, 2);
            } else if (onComplete) {
                onComplete();
            }
        }

        type();
    }

    function adjustSectionHeight(section) {
        const content = section.querySelector(".content");
        const openingBracket = section.querySelector(".opening");
        const closingBracket = section.querySelector(".closing");

        const contentHeight = content.scrollHeight;
        const bracketHeight = openingBracket.offsetHeight + closingBracket.offsetHeight;

        section.style.height = `${contentHeight + bracketHeight}px`;
    }

    function loadIcons(onComplete) {
        let completedIcons = 0;
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.opacity = 1;
                icon.style.transform = "scale(1)";
                completedIcons++;
                if (completedIcons === icons.length && onComplete) {
                    onComplete();
                }
            }, index * 200);
        });
    }

    function typeProjects() {
        const projectTypingTexts = document.querySelectorAll(".projects-list .typing-text");
        let projectIndex = 0;

        function typeNextProject() {
            if (projectIndex < projectTypingTexts.length) {
                const typingText = projectTypingTexts[projectIndex];
                const projectItem = typingText.closest("li");

                projectItem.style.visibility = "visible";

                typeText([...typingTexts].indexOf(typingText), () => {
                    projectIndex++;
                    typeNextProject();
                });
            }
        }

        typeNextProject();
    }

    typeText(0, () => {
        loadIcons(() => {
            typeProjects();
        });
    });
});