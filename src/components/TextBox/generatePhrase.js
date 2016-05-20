export default function generatePhrase (username) {
  var phrases = [
    `Что вы думаете о ${username}?`,
    `Поделись мнением о ${username}!`,
    `${username} владеет искусством матанализа?`,
    `Когда Вы первый раз познакомились с ${username}?`,
    `Расскажите смешную историю с ${username}`,
    `Опишите черты лица ${username}?`,
    `Сможете рассказать смешную историю с участием ${username}?`,
    `Напишите, например, какую музыку любит ${username}?`,
    `Вы были с ${username} наедине?`,
    `Когда Вы в последний раз виделись с ${username}?`,
    `Расскажите, любит ли ${username} животных?`,
    `${username} — тварь дрожащая или право имеет?`,
    `Расскажите всем, как вы познакомились с ${username}?`
  ];

  var random = Math.floor(Math.random() * phrases.length)
  return phrases[random];
}
