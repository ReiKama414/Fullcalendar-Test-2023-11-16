import React, { useState, useEffect } from "react";
// npm install --save @fullcalendar/react
import FullCalendar from "@fullcalendar/react";
// npm install --save @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
// npm install --save @fullcalendar/core
import zhTwLocale from "@fullcalendar/core/locales/zh-tw";
import eventData from "../../data/eventData";
import { parseISO } from "date-fns";

const Home = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const formattedEvents = eventData.map((event) => ({
			title: "打卡",
			date: parseISO(event.occurredAt),
		}));

		setEvents(formattedEvents);
	}, []);

	return (
		<>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
				initialView="dayGridMonth"
				headerToolbar={{
					left: "dayGridMonth,dayGridWeek,timeGridWeek,dayGridDay,listMonth",
					center: "title",
					right: "prev,next today",
				}}
				events={events}
				eventTimeFormat={{
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				}}
				// eventBackgroundColor="pink"
				locale={zhTwLocale}
				navLinks={true}
				// 不需要額外設置 navLinkDayClick / navLinkWeekClick 就有動作了
				// navLinkDayClick={(date, jsEvent) => {
				// 	console.log("day", date.toISOString());
				// 	console.log("coords", jsEvent.pageX, jsEvent.pageY);
				// }}
				// navLinkWeekClick={(weekStart, jsEvent) => {
				// 	console.log("week start", weekStart.toISOString());
				// 	console.log("coords", jsEvent.pageX, jsEvent.pageY);
				// }}
			/>
		</>
	);
};

export default Home;
