import './MoreButton.css';

export default function MoreButton({ handleClick }) {

  return (
    <div className='more-btn-cover'>
      <button className='more-btn' type='button' onClick={handleClick}>Ещё</button>
    </div>
  );
}
