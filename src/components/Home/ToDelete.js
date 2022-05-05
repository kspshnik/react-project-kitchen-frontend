import React from 'react';

import './ToDelete.css';

function ToDelete() {
  return (
    <div className="to-delete">
      <h2 className="to-delete__title">Привет!</h2>
      <p className="to-delete__paragraph">Этот компонент страницы вы можете удалить сразу. Он нужен, чтобы поприветствовать вас и вдохновить на коллективную работу.</p>
      <p className="to-delete__paragraph">Перед вами заготовка проекта для платформы коллективных блогов. Её вам предстоит переработать так, как вздумается. Этот сайт умеет регистрировать и авторизовывать пользователей, публиковать записи, снабжать их тегами, здесь есть личный кабинет и прочие штуки, популярные в современном интернете. </p>
      <p className="to-delete__paragraph">Самое важное в этом проекте — он уже написан на технологиях, которые вы будете проходить. С одной стороны, у вас будет шпаргалка по реализации некоторой функциональности из вашей основной программы, с другой — вы сможете попробовать применить здесь альтернативные решения и реализовать любые свои идеи.</p>
      <p className="to-delete__subtitle">Вот несколько идей, с чего можно начать:</p>
      <ul className="to-delete__list">
        <li className="to-delete__list-item">Весь интерфейс на английском языке. Чтобы познакомиться с компонентами, можете распределиться и перевести его.</li>
        <li className="to-delete__list-item">Мы вам поможем с дизайном. Сейчас дизайн выполнен на готовой библиотеке. Разделите компоненты между участниками команды и переверстайте их. Команда сопровождения расскажет, откуда получить дизайн-макет.</li>
        <li className="to-delete__list-item">Проект весь написан на классовых компонентах. Когда изучите хуки — исправьте это. Очень вероятно, что на работе вам дадут похожую задачу, практика не помешает.</li>
      </ul>
      <p className="to-delete__paragraph">«Проектная кухня» создана, чтобы вы работали вместе. Это важный навык для современных инженерных команд. Не стейняйтесь делегировать задачи и предлагать идеи улучшений этого проекта. Мы верим, что получится интересно.</p>
      <p className="to-delete__paragraph">Теперь смело удаляйте этот компонент из кода и раскомментируйте следующий за ним div с классом row. Так начнётся ваша коллективная работа.</p>
    </div>
  )
}

export default ToDelete;