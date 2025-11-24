import Calendar from 'react-calendar'
import { Box } from '../../shared'
import { Calendar1 } from 'lucide-react'

export default function Dates () {
  return (
    <Box>
      <div className='dates-header'>
        <h1>7 nights in New York</h1>
        <p>Feb 19, 2022 - Feb 26, 2022</p>
      </div>

      <div className="calendars">
        <Calendar/>
        <Calendar/>
      </div>
      <div className="actions">
        <Calendar1/>
        <p>Clear dates</p>
      </div>
    </Box>
  )
}
