export default function ProgressBar ({progress, percentage}) {
  return (
    <div className='ratings-container'>
      <div className='progress-container'>
        <div
          className='rating-bar'
          style={{
            width: `${progress}%`
          }}
        ></div>
      </div>
      <span>{percentage}</span>
    </div>
  )
}
