export default function generatePhrase (username) {
  var phrases = [
    `Владеет ли ${username} искусством матанализа?`,
    `Оценит ли ${username} то, что вы собираетесь написать?`,
    `${username} — хороший друг?`,
    `Как долго ${username} может продержаться без еды?`,
    `Врёт ли ${username}?`,
    `${username} доставлял вам неудобства?`,
    `${username} здоровается с вами или мимо проходит, не замечая?`,
    `Расскажите, любит ли ${username} животных?`,
    `${username} — тварь дрожащая или право имеет?`,
    `${username} предпочёл бы Гегеля или Ницше?`,
    `${username} любит кого-то?`
    `${username} просил передать привет.`,
    `Обладает ли ${username} хорошим вкусом?`
    `Знает ли ${username} о трёх перерождениях духа?`,
    `Какие книги читает ${username}?`,
    `${username} — это его настоящее имя?`,
    `${username} приходил в гости без спросу?`,
    `Мешает ли ${username} вам спать?`,
    `${username} поехал бы в Сургут?`
  ]

  var random = Math.floor(Math.random() * phrases.length)
  return phrases[random];
}
