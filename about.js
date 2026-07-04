const aboutList = document.getElementById("aboutCategoryList");
if (aboutList) {
  const counts = {};
  MATERIALS.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  const descriptions = {
    "콘크리트": "구조체, 기초, 슬래브 등 콘크리트 타설 자재",
    "철강": "철근, H형강 등 철골·철근콘크리트 구조용 자재",
    "목재": "거푸집, 목구조용 합판 및 구조용 각재",
    "유리": "외벽, 창호용 강화·복층 유리",
    "타일": "바닥·벽면 마감용 도자기·포세린 타일",
    "단열재": "외단열, 지붕 단열용 EPS·암면 보드",
    "석재": "외벽·바닥·인테리어용 천연 석재",
    "지붕재": "금속 지붕재, 아스팔트 슁글 등",
    "방수재": "옥상·지하·욕실 방수 시트 및 액체 방수재",
    "마감재": "석고보드, 외벽 도장 등 내부·외부 마감재"
  };

  aboutList.innerHTML = CATEGORIES.filter((c) => c !== "전체")
    .map(
      (category) => `
        <li>
          <strong>${category}</strong>
          <span>${counts[category] || 0}종 · ${descriptions[category] || ""}</span>
        </li>
      `
    )
    .join("");
}
