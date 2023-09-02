import { Helmet } from 'react-helmet';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import './Main.css';

export default function Main() {
  return (
    <>
      <Helmet>
        <title>Movies Explorer. Yandex Practicum Diploma</title>
      </Helmet>

  		<Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  );
}
