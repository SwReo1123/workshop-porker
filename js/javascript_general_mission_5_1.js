const startButton = document.querySelector("#startButton");
const parentCards = document.querySelector("#parentCards");
const childCards = document.querySelector("#childCards");
const parentResult = document.querySelector("#parentResult");
const childResult = document.querySelector("#childResult");

startButton.addEventListener("click", function(){
  // マークを作成
  const suits = ["heart", "spade", "diamond", "club"];
  // カードの数字・役を作成
  const cards = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
  ];
  // カードの強さ
  const cardValues = {
    Ace: 14,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13
  };
  // 52枚のデッキを作成
  const deck = [];
  for(let i = 0; i < suits.length; i++){
    for(let j = 0; j < cards.length; j++){
      deck.push(`${suits[i]}${cards[j]}`);
    }
  }
  // カードをシャッフル
  for(let i = deck.length - 1; i > 0; i--){
    const random = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[random]] = [deck[random], deck[i]];
  }
  // 親に5枚配る
  const parent = deck.splice(0, 5);
  // 子に5枚配る
  const child = deck.splice(0, 5);
  // 親のカードを数字・マークに変換
  const parentValues = [];
  const parentSuits = [];
  for(let i = 0; i < parent.length; i++){
    let suit = "";
    if(parent[i].startsWith("heart")){
      suit = "heart";
    }else if(parent[i].startsWith("spade")){
      suit = "spade";
    }else if(parent[i].startsWith("diamond")){
      suit = "diamond";
    }else if(parent[i].startsWith("club")){
      suit = "club";
    }
    const cardName = parent[i].slice(suit.length);
    const cardValue = cardValues[cardName];
    parentValues.push(cardValue);
    parentSuits.push(suit);
  }
  // 親の同じ数字を数える
  const parentCount = {};
  for(let i = 0; i < parentValues.length; i++){
    const value = parentValues[i];
    if(parentCount[value]){
      parentCount[value]++;
    }else{
      parentCount[value] = 1;
    }
  }
  // 親のストレート判定
  const parentSortValues = [...parentValues].sort((a, b) => a - b);
  const parentIsAceLowStraight =
    parentSortValues[0] === 2 &&
    parentSortValues[1] === 3 &&
    parentSortValues[2] === 4 &&
    parentSortValues[3] === 5 &&
    parentSortValues[4] === 14;

  const parentIsStraight =
    parentIsAceLowStraight ||
    (
      parentSortValues[1] === parentSortValues[0] + 1 &&
      parentSortValues[2] === parentSortValues[1] + 1 &&
      parentSortValues[3] === parentSortValues[2] + 1 &&
      parentSortValues[4] === parentSortValues[3] + 1
    );
  // 親のフラッシュ判定
  const parentIsFlush = parentSuits.every(
    value => value === parentSuits[0]
  );
  // 親の役判定
  let parentRole = "";
  if(parentIsStraight && parentIsFlush){
    parentRole = "ストレートフラッシュ";
  }else if(Object.values(parentCount).includes(4)){
    parentRole = "フォーカード";
  }else if(
    Object.values(parentCount).includes(3) &&
    Object.values(parentCount).includes(2)
  ){
    parentRole = "フルハウス";
  }else if(parentIsFlush){
    parentRole = "フラッシュ";
  }else if(parentIsStraight){
    parentRole = "ストレート";
  }else if(Object.values(parentCount).includes(3)){
    parentRole = "スリーカード";
  }else if(
    Object.values(parentCount).filter(value => value === 2).length === 2
  ){
    parentRole = "ツーペア";
  }else if(Object.values(parentCount).includes(2)){
    parentRole = "ワンペア";
  }else{
    parentRole = "ハイカード";
  }
  // 親のカードをHTMLに表示
  parentCards.innerHTML = "";
  for(let i = 0; i < parent.length; i++){
    let suit = "";
    if(parent[i].startsWith("heart")){
      suit = "heart";
    }else if(parent[i].startsWith("spade")){
      suit = "spade";
    }else if(parent[i].startsWith("diamond")){
      suit = "diamond";
    }else if(parent[i].startsWith("club")){
      suit = "club";
    }
    parentCards.innerHTML += `
      <img src="playcard/${suit}/${parent[i]}.png">
    `;
  }
  // 子のカードを数字・マークに変換
  const childValues = [];
  const childSuits = [];

  for(let i = 0; i < child.length; i++){
    let suit = "";
    if(child[i].startsWith("heart")){
      suit = "heart";
    }else if(child[i].startsWith("spade")){
      suit = "spade";
    }else if(child[i].startsWith("diamond")){
      suit = "diamond";
    }else if(child[i].startsWith("club")){
      suit = "club";
    }
    const cardName = child[i].slice(suit.length);
    const cardValue = cardValues[cardName];
    childValues.push(cardValue);
    childSuits.push(suit);
  }
  // 子の同じ数字を数える
  const childCount = {};
  for(let i = 0; i < childValues.length; i++){
    const value = childValues[i];
    if(childCount[value]){
      childCount[value]++;
    }else{
      childCount[value] = 1;
    }
  }
  // 子のストレート判定
  const childSortValues = [...childValues].sort((a, b) => a - b);
  const childIsAceLowStraight =
    childSortValues[0] === 2 &&
    childSortValues[1] === 3 &&
    childSortValues[2] === 4 &&
    childSortValues[3] === 5 &&
    childSortValues[4] === 14;

  const childIsStraight =
    childIsAceLowStraight ||
    (
      childSortValues[1] === childSortValues[0] + 1 &&
      childSortValues[2] === childSortValues[1] + 1 &&
      childSortValues[3] === childSortValues[2] + 1 &&
      childSortValues[4] === childSortValues[3] + 1
    );
  // 子のフラッシュ判定
  const childIsFlush = childSuits.every(
    value => value === childSuits[0]
  );
  // 子の役判定
  let childRole = "";
  if(childIsStraight && childIsFlush){
    childRole = "ストレートフラッシュ";
  }else if(Object.values(childCount).includes(4)){
    childRole = "フォーカード";
  }else if(
    Object.values(childCount).includes(3) &&
    Object.values(childCount).includes(2)
  ){
    childRole = "フルハウス";
  }else if(childIsFlush){
    childRole = "フラッシュ";
  }else if(childIsStraight){
    childRole = "ストレート";
  }else if(Object.values(childCount).includes(3)){
    childRole = "スリーカード";
  }else if(
    Object.values(childCount).filter(value => value === 2).length === 2
  ){
    childRole = "ツーペア";
  }else if(Object.values(childCount).includes(2)){
    childRole = "ワンペア";
  }else{
    childRole = "ハイカード";
  }
  // 子のカードをHTMLに表示
  childCards.innerHTML = "";
  for(let i = 0; i < child.length; i++){
    let suit = "";
    if(child[i].startsWith("heart")){
      suit = "heart";
    }else if(child[i].startsWith("spade")){
      suit = "spade";
    }else if(child[i].startsWith("diamond")){
      suit = "diamond";
    }else if(child[i].startsWith("club")){
      suit = "club";
    }
    childCards.innerHTML += `
      <img src="playcard/${suit}/${child[i]}.png">
    `;
  }
  // 役の強さ
  const roleValues = {
    ハイカード: 1,
    ワンペア: 2,
    ツーペア: 3,
    スリーカード: 4,
    ストレート: 5,
    フラッシュ: 6,
    フルハウス: 7,
    フォーカード: 8,
    ストレートフラッシュ: 9
  };
  // 親と子の役を数字に変換
  const parentRoleValue = roleValues[parentRole];
  const childRoleValue = roleValues[childRole];
  // 勝敗判定
  let result = "";
  if(parentRoleValue > childRoleValue){
    result = "親の勝ち";
  }else if(parentRoleValue < childRoleValue){
    result = "子の勝ち";
  }else{
    // 役が同じ場合

    // カードの強さを比較する配列を作成
    let parentCompare = [];
    let childCompare = [];

    // ハイカード
    if(parentRole === "ハイカード"){
      parentCompare = [...parentValues].sort((a, b) => b - a);
      childCompare = [...childValues].sort((a, b) => b - a);

    // ワンペア
    }else if(parentRole === "ワンペア"){
      const parentPair = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 2
        )
      );
      const childPair = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 2
        )
      );

      const parentKickers = parentValues
        .filter(value => value !== parentPair)
        .sort((a, b) => b - a);

      const childKickers = childValues
        .filter(value => value !== childPair)
        .sort((a, b) => b - a);

      parentCompare = [parentPair, ...parentKickers];
      childCompare = [childPair, ...childKickers];

    // ツーペア
    }else if(parentRole === "ツーペア"){
      const parentPairs = Object.keys(parentCount)
        .filter(value => parentCount[value] === 2)
        .map(Number)
        .sort((a, b) => b - a);

      const childPairs = Object.keys(childCount)
        .filter(value => childCount[value] === 2)
        .map(Number)
        .sort((a, b) => b - a);

      const parentKicker = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 1
        )
      );

      const childKicker = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 1
        )
      );

      parentCompare = [
        parentPairs[0],
        parentPairs[1],
        parentKicker
      ];

      childCompare = [
        childPairs[0],
        childPairs[1],
        childKicker
      ];

    // スリーカード
    }else if(parentRole === "スリーカード"){
      const parentThree = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 3
        )
      );

      const childThree = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 3
        )
      );

      const parentKickers = parentValues
        .filter(value => value !== parentThree)
        .sort((a, b) => b - a);

      const childKickers = childValues
        .filter(value => value !== childThree)
        .sort((a, b) => b - a);

      parentCompare = [
        parentThree,
        ...parentKickers
      ];

      childCompare = [
        childThree,
        ...childKickers
      ];

    // ストレート
    }else if(parentRole === "ストレート"){
      const parentHighCard = parentIsAceLowStraight
        ? 5
        : Math.max(...parentValues);

      const childHighCard = childIsAceLowStraight
        ? 5
        : Math.max(...childValues);

      parentCompare = [parentHighCard];
      childCompare = [childHighCard];

    // フラッシュ
    }else if(parentRole === "フラッシュ"){
      parentCompare = [...parentValues].sort((a, b) => b - a);
      childCompare = [...childValues].sort((a, b) => b - a);

    // フルハウス
    }else if(parentRole === "フルハウス"){
      const parentThree = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 3
        )
      );

      const childThree = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 3
        )
      );

      const parentPair = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 2
        )
      );

      const childPair = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 2
        )
      );

      parentCompare = [
        parentThree,
        parentPair
      ];

      childCompare = [
        childThree,
        childPair
      ];

    // フォーカード
    }else if(parentRole === "フォーカード"){
      const parentFour = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 4
        )
      );

      const childFour = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 4
        )
      );

      const parentKicker = Number(
        Object.keys(parentCount).find(
          value => parentCount[value] === 1
        )
      );

      const childKicker = Number(
        Object.keys(childCount).find(
          value => childCount[value] === 1
        )
      );

      parentCompare = [
        parentFour,
        parentKicker
      ];

      childCompare = [
        childFour,
        childKicker
      ];

    // ストレートフラッシュ
    }else if(parentRole === "ストレートフラッシュ"){
      const parentHighCard = parentIsAceLowStraight
        ? 5
        : Math.max(...parentValues);

      const childHighCard = childIsAceLowStraight
        ? 5
        : Math.max(...childValues);

      parentCompare = [parentHighCard];
      childCompare = [childHighCard];
    }

    // 比較用配列を上から順番に比較
    let cardResult = 0;

    for(let i = 0; i < parentCompare.length; i++){
      if(parentCompare[i] > childCompare[i]){
        cardResult = 1;
        break;
      }else if(parentCompare[i] < childCompare[i]){
        cardResult = -1;
        break;
      }
    }

    if(cardResult === 1){
      result = "親の勝ち";
    }else if(cardResult === -1){
      result = "子の勝ち";
    }else{
      result = "引き分け";
    }
  }

  if(result === "親の勝ち"){
  parentResult.textContent = "勝ち";
  childResult.textContent = "負け";
}else if(result === "子の勝ち"){
  parentResult.textContent = "負け";
  childResult.textContent = "勝ち";
}else{
  parentResult.textContent = "引き分け";
  childResult.textContent = "引き分け";
}
  // コンソールに結果を表示
const parentTrumprole = document.querySelector(".parentTrumprole");
const childTrumprole = document.querySelector(".childTrumprole");
  parentTrumprole.innerHTML = ("親の役:", parentRole);
  childTrumprole.innerHTML = ("子の役:", childRole);
//console.log("親のカード:", parent);
//console.log("親の数字:", parentValues);
//console.log("子のカード:", child);
//console.log("子の数字:", childValues);
//console.log("親の役の強さ:", parentRoleValue);
//console.log("子の役の強さ:", childRoleValue);
});
//developへ移行