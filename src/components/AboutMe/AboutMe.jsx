import { Link } from 'react-router-dom';
import MyPhoto from '../../images/avatar.jpg';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section-title'>Студент</h2>
      <div className='about-me__cover'>
        <div className='about-me__text'>
          <h3 className='about-me__name'>Денис</h3>
          <p className='about-me__short'>Разработчик, 35 лет</p>
          <p className='about-me__long'>Я живу в Ростове-на-Дону, закончил факультет информационных технологий ЮРГТУ (НПИ). Несмотря на полученное образование, долгое время не получалось устроиться в IT. Несколько лет работаю SEO-специалистом, после обучения в Яндекс Практикуме планирую сменить профессию.</p>
          <Link to='https://github.com/Den-Rulla' className='about-me__link' target='_blank'>Github</Link>
        </div>
        <img className='about-me__photo' src={MyPhoto} alt='Моё фото' />
      </div>

    </section>
  );
}
