import  { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {
  CalendarWrapper,
  DayInfo,
} from './CalendarStyle';
import { useSelector } from 'react-redux';
import { childApi } from '../../../apiService';

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

  // 출석일 리스트 가져오기 
  const [dayList, setDayList] = useState([]);
  const childId = useSelector((state) => state.child.id);
  // const childId = 24;
  const token = useSelector((state) => state.token.accessToken);
  const getDayList = async () => {
    try {
      const response = await childApi.get(`${childId}/play-record/attendance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setDayList(response.data);
      console.log(response);

    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
      // alert(error.response.data.msg); // 에러 메시지 알림
    }
  };
  useEffect(() => {
    getDayList();
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 호출
  useEffect(() => {
    
  }, [dayList]); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 호출

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
        <DayInfo>날짜는 매일 오전 9시에 변경됩니다.</DayInfo>
    </CalendarWrapper>
  );
}

export default Attendance;
