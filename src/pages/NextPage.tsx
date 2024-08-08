import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays, format } from 'date-fns';
import './NextPage.scss';
import 'react-date-range/dist/styles.css'; // date-range styles
import 'react-date-range/dist/theme/default.css'; // default theme
import { ko } from 'date-fns/locale';
import { useTravelStore } from '../store/store';

interface Schedule {
  startDate: Date,
  endDate: Date,
  key: string
}

const NextPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [duration, setDuration] = useTravelStore((state) => [state.duration, state.setDuration]);
  const [startDate, setStartDate] = useTravelStore((state) => [state.startDate, state.setStartDate]);
  const [endDate, setEndDate] = useTravelStore((state) => [state.endDate, state.setEndDate]);


  const [selectedRange, setSelectedRange] = useState<Schedule>({
    startDate,
    endDate,
    key: 'selection'
  });

  const setMonth = useTravelStore((state) => state.setMonth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDatePicker(true);
      setDuration(0)
    }, 1000); // 1초 후에 DateRangePicker 활성화

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (ranges: any) => {
    setSelectedRange(ranges.selection);
  
    if (ranges.selection) {
      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
      setDuration(differenceInDays(ranges.selection.endDate, ranges.selection.startDate));
      
      const month = ranges.selection.startDate.getMonth() + 1; // 월을 1부터 12까지로 맞추기 위해 +1
      setMonth(month);
    }
  };

  return (
    <div id="travel" className="app">
      <div className="form-container">
        <div className="form">
          <Collapse in={true}>
            <h2 className="animated-text">언제 떠나실까요?</h2>
          </Collapse>
          <Collapse in={showDatePicker}>
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[selectedRange]}
                months={1}
                direction="horizontal"
                minDate={new Date()}
              />
              {startDate && endDate && (
                <div className="date-info">
                  <div>
                    <p className='grey-txt'>출발일</p>
                    <p className='date-txt'>{format(startDate, 'MM월 dd일 (eee)', { locale: ko })}</p>
                  </div>
                  <div>
                    <p className='grey-txt'>도착일</p>
                    <p className='date-txt'>{format(endDate, 'MM월 dd일 (eee)', { locale: ko })}</p>
                  </div>
                </div>
              )}
            </div>
          </Collapse>
          <Collapse in={showDatePicker && !!duration}>
            <div className="next-button-container">
              {duration ? (
                <button className="next-button" onClick={() => {
                  navigate('/recommendation')
                }}>{`${duration}박 ${duration + 1}일 선택`}</button>
              ) : ''}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
