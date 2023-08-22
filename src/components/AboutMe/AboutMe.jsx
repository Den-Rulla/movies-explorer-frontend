import { Link } from 'react-router-dom';
import MyPhoto from '../../images/my-photo.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section__title'>Студент</h2>
      <div className='about-me__cover'>
        <div className='about-me__text'>
          <h3 className='about-me__name'>Виталий</h3>
          <p className='about-me__short'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__long'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <Link to='https://github.com/Den-Rulla' className='about-me__link' target='_blank'>Github</Link>
        </div>
        <img className='about-me__photo' src={MyPhoto} alt='Моё фото' />
      </div>

    </section>
  );
}