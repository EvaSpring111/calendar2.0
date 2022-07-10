function createCalendar(month, year, calendarElem ) {
    const NameOfMonth = createCalendar.monthes[month];
    const headCalendar = `${NameOfMonth} ${year}`;

    calendarElem.querySelector('.calendar_title').innerText = headCalendar;
 
    const firstDayOfMonth = new Date();

    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setMonth(month);
    firstDayOfMonth.setFullYear(year);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const firstDayOnStart = new Date(firstDayOfMonth);

    const firstShiftDays = (6 + firstDayOfWeek) % 7;

    firstDayOnStart.setDate(firstDayOnStart.getDate() - firstShiftDays);

    const lastMonthDay = new Date(firstDayOfMonth);

    lastMonthDay.setMonth(month+1);
    lastMonthDay.setDate(0);

    const lastWeekDayOfMonth = lastMonthDay.getDay();
    const lastDayInCalendar = new Date(lastMonthDay);
    const lasShiftDay = (7 - lastWeekDayOfMonth) % 7;

    lastDayInCalendar.setDate(lastDayInCalendar.getDate() + lasShiftDay);

    const days = [];
    for (
        const currentDay = new Date(firstDayOnStart);
        currentDay <= lastDayInCalendar;
        currentDay.setDate(currentDay.getDate() + 1)
    ) {
        const dayElem = document.createElement('li');

        dayElem.className = 'calendar_day';

        if(currentDay.getMonth() !== month) {
            dayElem.classList.add('calendar__day--not-in-month');
        } 

        const link = document.createElement('a');

        link.setAttribute('aria-lable', currentDay.toLocaleString());
        link.href = `?day=${currentDay.toJSON()}`;

        link.innerText = currentDay.getDate();

        dayElem.append(link);

        days.push(dayElem);
    }

    const placeForDaysElem = document.querySelector('.calendar_days');

    placeForDaysElem.innerText = '';

    placeForDaysElem.append( ...days );

}

    createCalendar.monthes = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const calendarElem = document.querySelector('.calendar');
    const BtnLeftElem = calendarElem.querySelector('.calendar__btn--prev');
    const BtnRightElem = calendarElem.querySelector('.calendar__btn--next');

    let today = new Date();

    const calendar = {
        month: today.getMonth(),
        year: today.getFullYear()
    };

    createCalendar(calendar.month, calendar.year, calendarElem);

    BtnLeftElem.addEventListener('click', function() {
        const firstDayOfMonth = new Date(calendar.year, calendar.month, 1);

        firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1);

        calendar.month = firstDayOfMonth.getMonth();
        calendar.year = firstDayOfMonth.getFullYear();

        createCalendar(calendar.month, calendar.year, calendarElem);

    });

    BtnRightElem.addEventListener('click', function() {
        const lastMonthDay = new Date(calendar.year, calendar.month, 1);

        lastMonthDay.setMonth(lastMonthDay.getMonth() + 1);

        calendar.month = lastMonthDay.getMonth();
        calendar.year = lastMonthDay.getFullYear();

        createCalendar(calendar.month, calendar.year, calendarElem);

    });












