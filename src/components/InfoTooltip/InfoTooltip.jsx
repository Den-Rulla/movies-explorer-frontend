import './InfoTooltip.css';

export default function InfoTooltip({ openToolTip, setOpenToolTip, toolTipText }) {

  function handleClose() {
    setOpenToolTip(false);
  }

  return (
    <div className={`tooltip  ${openToolTip ? 'tooltip_opened' : ''}`}>
      <button className='tooltip__close-btn' onClick={handleClose} />
      <p className='tooltip__text'>{toolTipText}</p>
    </div>
  );
}
