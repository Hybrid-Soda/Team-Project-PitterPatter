import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {
  CalendarWrapper
} from './CalendarStyle';

function Attendance() {
  const [date, setDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(moment(date).format('YYYY-MM'));

  const onChange = date => {
    setDate(date);
  };

  const getActiveMonth = activeStartDate => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM-DD');
    setActiveMonth(newActiveMonth);
  };

  const dayList = ["2024-07-24", "2024-07-25", "2024-07-26"];

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (dayList.find(day => day === moment(date).format('YYYY-MM-DD'))) {
        return 'attendance-day';
      }
    }
    return null;
  };

  return (
    <CalendarWrapper>
      <Calendar
        onChange={onChange}
        value={date}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        tileClassName={tileClassName}
        onActiveStartDateChange={({ activeStartDate }) => getActiveMonth(activeStartDate)}
      />
    </CalendarWrapper>
  );
}

export default Attendance;
