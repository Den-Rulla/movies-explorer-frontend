import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id='learn-more'>
      <h2 className='section-title'>О проекте</h2>
      <div className='about-project__text-cover'>
        <div className='about-project__text'>
          <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__text'>
          <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__timeline'>
        <div className='about-project__timeline-item-back'>
          <p className='about-project__timeline-item-duration'>1 неделя</p>
          <p className='about-project__timeline-item-course'>Back-end</p>
        </div>
        <div className='about-project__timeline-item-front'>
          <p className='about-project__timeline-item-duration about-project__timeline-item-duration_type_black'>4 недели</p>
          <p className='about-project__timeline-item-course'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
