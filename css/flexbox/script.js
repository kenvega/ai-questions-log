const lessons = {
  parent: [
    {
      id: "display",
      title: "display",
      navText: "start a flex context",
      description: "Turns an element into a flex container so its direct children can be arranged with Flexbox.",
      defaultValue: "flex",
      values: ["flex", "inline-flex"],
      meaningTitle: "It switches Flexbox on.",
      meaningCopy:
        "Both values create the same flex behavior inside the container. The difference is how the container itself participates in the surrounding page.",
      memory: "flex behaves like a block; inline-flex behaves like an inline element.",
      captions: {
        flex: "The flex container takes the available width, like a block element.",
        "inline-flex": "The inline-flex container shrinks around its items."
      },
      code: (value) => `.container {\n  display: ${value};\n}`
    },
    {
      id: "flex-direction",
      title: "flex-direction",
      navText: "choose the main axis",
      description: "Chooses the direction items travel inside the container.",
      defaultValue: "row",
      values: ["row", "row-reverse", "column", "column-reverse"],
      meaningTitle: "It sets the main axis.",
      meaningCopy:
        "Row values move items sideways. Column values stack them vertically. Adding -reverse flips the starting edge.",
      memory: "direction changes where “start” and “end” live.",
      captions: {
        row: "Items follow the main axis from left to right.",
        "row-reverse": "The row stays horizontal, but its starting edge is reversed.",
        column: "The main axis now runs from top to bottom.",
        "column-reverse": "The column starts at the bottom and travels upward."
      },
      code: (value) => `.container {\n  display: flex;\n  flex-direction: ${value};\n}`
    },
    {
      id: "justify-content",
      title: "justify-content",
      navText: "space items on the main axis",
      description: "Controls how flex items share leftover room along the main axis.",
      defaultValue: "space-between",
      values: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
      meaningTitle: "It distributes leftover space.",
      meaningCopy:
        "The items keep their own size. This property decides where the unused space goes before, after, or between them.",
      memory: "justify follows the main axis set by flex-direction.",
      captions: {
        "flex-start": "Items gather at the start of the main axis.",
        center: "The group of items sits in the center.",
        "flex-end": "Items gather at the end of the main axis.",
        "space-between": "All extra space goes between items; the outside items touch the edges.",
        "space-around": "Every item receives equal space on both sides, making the outer gaps smaller.",
        "space-evenly": "The gaps between items and at both edges are equal."
      },
      code: (value) => `.container {\n  display: flex;\n  justify-content: ${value};\n}`
    }
  ],
  children: [
    {
      id: "order",
      title: "order",
      navText: "move one visual position",
      description: "Changes where one flex item appears without changing the HTML source order.",
      defaultValue: "-1",
      values: ["-1", "0", "1"],
      meaningTitle: "It changes the visual sequence.",
      meaningCopy:
        "Every item starts at order 0. Lower numbers appear first and higher numbers appear later. Items with the same number keep their source order.",
      memory: "visual order is not reading order, so use it carefully for accessibility.",
      captions: {
        "-1": "Item 2 has a lower order value, so it appears before items 1 and 3.",
        "0": "All three items are order 0, so their original HTML order wins.",
        "1": "Item 2 has a higher order value, so it appears after items 1 and 3."
      },
      code: (value) => `.item--two {\n  order: ${value};\n}`
    },
    {
      id: "flex-grow",
      title: "flex-grow",
      navText: "claim leftover room",
      description: "Controls how strongly one item grows when the container has extra space.",
      defaultValue: "2",
      values: ["0", "1", "2", "3"],
      meaningTitle: "It assigns a share of free space.",
      meaningCopy:
        "A value of 0 opts out. Positive numbers behave like proportions: an item with 2 receives twice the growth share of an item with 1.",
      memory: "grow distributes extra space; it does not directly set an item’s width.",
      captions: {
        "0": "Item 2 keeps its base size while items 1 and 3 claim the extra space.",
        "1": "All items have the same growth factor, so they grow evenly.",
        "2": "Item 2 receives twice the growth share of either neighbor.",
        "3": "Item 2 receives three times the growth share of either neighbor."
      },
      code: (value) => `.item--two {\n  flex-grow: ${value};\n}`
    },
    {
      id: "align-self",
      title: "align-self",
      navText: "align one item alone",
      description: "Overrides the container’s cross-axis alignment for one flex item.",
      defaultValue: "flex-end",
      values: ["auto", "flex-start", "center", "flex-end", "stretch"],
      meaningTitle: "It lets one item break rank.",
      meaningCopy:
        "The container can align every item with align-items. This property overrides that choice for only the selected child.",
      memory: "align-self moves one item on the cross axis, not the main axis.",
      captions: {
        auto: "Item 2 inherits align-items: center from its parent.",
        "flex-start": "Item 2 moves to the start of the cross axis.",
        center: "Item 2 sits at the center of the cross axis.",
        "flex-end": "Item 2 moves to the end of the cross axis.",
        stretch: "Item 2 stretches across the cross axis because it has no fixed height."
      },
      code: (value) => `.container {\n  display: flex;\n  align-items: center;\n}\n\n.item--two {\n  align-self: ${value};\n}`
    }
  ]
};

const elements = {
  tabs: [...document.querySelectorAll(".tab-button")],
  propertyList: document.querySelector("#property-list"),
  groupLabel: document.querySelector("#group-label"),
  owner: document.querySelector("#property-owner"),
  footerOwner: document.querySelector("#footer-owner"),
  title: document.querySelector("#property-title"),
  description: document.querySelector("#property-description"),
  lessonIndex: document.querySelector("#lesson-index"),
  controls: document.querySelector("#value-controls"),
  currentRule: document.querySelector("#current-rule"),
  canvas: document.querySelector("#demo-canvas"),
  container: document.querySelector("#demo-container"),
  focusItem: document.querySelector("#focus-item"),
  items: [...document.querySelectorAll(".flex-item")],
  mainAxis: document.querySelector("#main-axis-label"),
  crossAxis: document.querySelector("#cross-axis-label"),
  caption: document.querySelector("#demo-caption"),
  code: document.querySelector("#code-example"),
  meaningTitle: document.querySelector("#meaning-title"),
  meaningCopy: document.querySelector("#meaning-copy"),
  memory: document.querySelector("#memory-copy"),
  next: document.querySelector("#next-property")
};

let activeGroup = "parent";
let activeLesson = lessons.parent[1];
let activeValue = activeLesson.defaultValue;

function findLesson(id) {
  for (const [group, groupLessons] of Object.entries(lessons)) {
    const lesson = groupLessons.find((item) => item.id === id);
    if (lesson) return { group, lesson };
  }
  return null;
}

function resetDemo() {
  elements.canvas.classList.remove("child-demo");
  elements.container.className = "demo-container";
  elements.container.removeAttribute("style");
  elements.items.forEach((item) => item.removeAttribute("style"));
  elements.mainAxis.textContent = "main axis →";
  elements.crossAxis.textContent = "cross axis ↓";
}

function applyDemo(lesson, value) {
  resetDemo();

  if (activeGroup === "children") {
    elements.canvas.classList.add("child-demo");
  }

  switch (lesson.id) {
    case "display":
      if (value === "inline-flex") elements.container.classList.add("is-inline");
      break;

    case "flex-direction":
      elements.container.style.flexDirection = value;
      if (value.includes("column")) elements.container.classList.add("is-column");
      elements.mainAxis.textContent = value === "row"
        ? "main axis →"
        : value === "row-reverse"
          ? "main axis ←"
          : value === "column"
            ? "main axis ↓"
            : "main axis ↑";
      elements.crossAxis.textContent = value.includes("column") ? "cross axis →" : "cross axis ↓";
      break;

    case "justify-content":
      elements.container.style.justifyContent = value;
      break;

    case "order":
      elements.focusItem.style.order = value;
      break;

    case "flex-grow":
      elements.items[0].style.flex = "1 1 72px";
      elements.focusItem.style.flex = `${value} 1 72px`;
      elements.items[2].style.flex = "1 1 72px";
      break;

    case "align-self":
      elements.container.style.alignItems = "center";
      elements.items[0].style.minHeight = "72px";
      elements.items[2].style.minHeight = "72px";
      elements.focusItem.style.minHeight = value === "stretch" ? "0" : "72px";
      elements.focusItem.style.alignSelf = value;
      break;
  }
}

function renderProperties() {
  const groupLessons = lessons[activeGroup];
  elements.groupLabel.textContent = activeGroup === "parent"
    ? "Properties on the container"
    : "Properties on the flex items";
  elements.propertyList.setAttribute("aria-labelledby", `${activeGroup}-tab`);
  elements.propertyList.setAttribute("aria-label", `${activeGroup === "parent" ? "Parent" : "Children"} properties`);

  elements.propertyList.replaceChildren(
    ...groupLessons.map((lesson, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `property-link${lesson.id === activeLesson.id ? " is-active" : ""}`;
      button.dataset.property = lesson.id;
      button.setAttribute("aria-current", lesson.id === activeLesson.id ? "page" : "false");
      button.innerHTML = `
        <span class="nav-number">${String(index + 1).padStart(2, "0")}</span>
        <span><strong>${lesson.title}</strong><small>${lesson.navText}</small></span>
        <span class="nav-arrow" aria-hidden="true">→</span>
      `;
      button.addEventListener("click", () => selectLesson(lesson));
      return button;
    })
  );
}

function renderControls() {
  elements.controls.replaceChildren(
    ...activeLesson.values.map((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `value-button${value === activeValue ? " is-active" : ""}`;
      button.textContent = value;
      button.setAttribute("aria-pressed", String(value === activeValue));
      button.addEventListener("click", () => selectValue(value));
      return button;
    })
  );
  elements.controls.setAttribute("aria-label", `Choose a value for ${activeLesson.title}`);
}

function renderLesson({ updateHash = true } = {}) {
  const groupLessons = lessons[activeGroup];
  const lessonPosition = groupLessons.findIndex((lesson) => lesson.id === activeLesson.id) + 1;
  const ownerLabel = activeGroup === "parent" ? "Parent" : "Children";

  elements.tabs.forEach((tab) => {
    const isActive = tab.dataset.group === activeGroup;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  elements.owner.textContent = `${ownerLabel} property`;
  elements.footerOwner.textContent = ownerLabel;
  elements.title.textContent = activeLesson.title;
  elements.description.textContent = activeLesson.description;
  elements.lessonIndex.textContent = `${String(lessonPosition).padStart(2, "0")} / 03`;
  elements.lessonIndex.setAttribute("aria-label", `Lesson ${lessonPosition} of 3`);
  elements.currentRule.textContent = `${activeLesson.title}: ${activeValue};`;
  elements.caption.innerHTML = activeLesson.captions[activeValue].replace(
    activeValue,
    `<code>${activeValue}</code>`
  );
  elements.code.textContent = activeLesson.code(activeValue);
  elements.meaningTitle.textContent = activeLesson.meaningTitle;
  elements.meaningCopy.textContent = activeLesson.meaningCopy;
  elements.memory.textContent = activeLesson.memory;

  renderProperties();
  renderControls();
  applyDemo(activeLesson, activeValue);

  if (updateHash) history.replaceState(null, "", `#${activeLesson.id}`);
  document.title = `${activeLesson.title} — Flexbox Field Guide`;
}

function selectLesson(lesson, options) {
  activeLesson = lesson;
  activeValue = lesson.defaultValue;
  renderLesson(options);
}

function selectValue(value) {
  activeValue = value;
  renderControls();
  elements.currentRule.textContent = `${activeLesson.title}: ${activeValue};`;
  elements.caption.innerHTML = activeLesson.captions[activeValue].replace(
    activeValue,
    `<code>${activeValue}</code>`
  );
  elements.code.textContent = activeLesson.code(activeValue);
  applyDemo(activeLesson, activeValue);
}

function selectGroup(group) {
  if (group === activeGroup) return;
  activeGroup = group;
  selectLesson(lessons[group][0]);
}

elements.tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectGroup(tab.dataset.group));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = elements.tabs[(index + direction + elements.tabs.length) % elements.tabs.length];
    nextTab.focus();
    selectGroup(nextTab.dataset.group);
  });
});

elements.next.addEventListener("click", () => {
  const groupLessons = lessons[activeGroup];
  const currentIndex = groupLessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const nextIndex = (currentIndex + 1) % groupLessons.length;
  selectLesson(groupLessons[nextIndex]);
  document.querySelector("#main-content").focus({ preventScroll: true });
});

window.addEventListener("hashchange", () => {
  const match = findLesson(location.hash.slice(1));
  if (!match) return;
  activeGroup = match.group;
  selectLesson(match.lesson, { updateHash: false });
});

const initialMatch = findLesson(location.hash.slice(1));
if (initialMatch) {
  activeGroup = initialMatch.group;
  activeLesson = initialMatch.lesson;
  activeValue = activeLesson.defaultValue;
}

renderLesson({ updateHash: !initialMatch });
