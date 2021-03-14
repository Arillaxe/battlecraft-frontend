import './play.sass';

const Play = () => (
  <div className="play">
    <div className="play-title">Как начать играть</div>
    <div className="play-blocks">
      <div className="block play-green">
        <div className="play-counter">1</div>
        <div className="play-block-title">Создайте аккаунт</div>
        <div className="play-description">
          Придумайте уникальный ник и невероятно сложный пароль.
        </div>
        <button>Зарегистрироваться</button>
      </div>
      <div className="block play-yellow">
        <div className="play-counter">2</div>
        <div className="play-block-title">Прочтите правила</div>
        <div className="play-description">
          Незнание правил не освобождает Вас от ответсвенности!
        </div>
        <button className="">Прочесть правила</button>
      </div>
      <div className="block play-orange">
        <div className="play-counter">3</div>
        <div className="play-block-title">Скачайте лаунчер</div>
        <div className="play-description">
          Выберите лаунчер под свою операционную систему.
        </div>
        <button>Скачать лаунчер</button>
      </div>
    </div>
  </div>
);

export default Play;
