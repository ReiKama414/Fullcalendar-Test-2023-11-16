import React, { useState, useEffect } from "react";
// npm install --save @fullcalendar/react
import FullCalendar from "@fullcalendar/react";
// npm install --save @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
// npm install --save @fullcalendar/core
import zhTwLocale from "@fullcalendar/core/locales/zh-tw";
// npm install -save @fullcalendar/interaction
// 用於事件拖曳、事件調整大小、日期點擊和日期選擇的日曆功能
import interactionPlugin from "@fullcalendar/interaction";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import eventData from "../../data/eventData";
import { parseISO } from "date-fns";

const Home = () => {
	const [events, setEvents] = useState([]);
	// const [currentEvents, setCurrentEvents] = useState([]);

	useEffect(() => {
		const formattedEvents = eventData.map((event) => ({
			id: event.id,
			title: "打卡",
			date: parseISO(event.occurredAt),
		}));

		setEvents(formattedEvents);
	}, []);

	return (
		<>
			<FullCalendar
				themeSystem="Journal"
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				// // 設為星期一開始
				// firstDay={1}
				// validRange - (未添加至設置) 功用為限制顯示範圍
				headerToolbar={{
					// 逗號為緊密相鄰, 空格為有間隙
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,dayGridWeek,timeGridWeek,dayGridDay,listMonth",
					// right: "dayGridMonth,timeGridWeek,listMonth",
				}}
				// eventDrop, eventClick
				events={events}
				// 設定初始化 event
				// initialEvents={currentEvents}
				// eventsSet={(events) => setCurrentEvents(events)}
				// 最多顯示多少個
				dayMaxEvents={true}
				views={{
					dayGridMonth: {
						dayMaxEvents: 2,
					},
				}}
				// 設置可以編輯 => 拖動與縮放
				editable={false}
				// 是否可以點擊
				selectable={true}
				// 去掉週六週日(默認 true)
				weekends={true}
				// 排除顯示一週中的某些星期(e.g.去掉週二、週四)
				// hiddenDays={[2, 4]}
				eventTimeFormat={{
					hour: "numeric",
					minute: "2-digit",
					hour12: true, // 設定為 true 表示使用12小時制（上午/下午）
				}}
				// 事件點擊事件
				eventClick={(info) => {
					console.log("Event clicked:", info.event.id, info.event.title, info.event);
				}}
				// eventContent={(info) => {
				// 	return (
				// 		<Tooltip
				// 			title={
				// 				<div>
				// 					First Line
				// 					<br />
				// 					Second Line
				// 				</div>
				// 			}
				// 			arrow>
				// 			<p>{info.event.title}</p>
				// 		</Tooltip>
				// 	);
				// }}
				// 滑鼠 Hover 事件
				// eventMouseEnter={(info) => {
				// 	console.log("Mouse entered event:", info.event.id, info.event.title);
				// }}
				// eventMouseLeave={(info) => {
				// 	console.log("Mouse left event:", info.event.id, info.event.title);
				// }}
				// 日期點擊事件
				select={(selected) => {
					console.log(selected);
					const title = prompt("Please enter a new title for your event");
					const calendarApi = selected.view.calendar;
					calendarApi.unselect();

					if (title) {
						calendarApi.addEvent({
							title,
							start: selected.startStr,
							end: selected.endStr,
							allDay: selected.allDay,
						});
					}
				}}
				// 在月視圖中決定是否應該呈現上個月或下個月的日期
				showNonCurrentDates={false}
				// 決定是否應在日曆上顯示週數
				weekNumbers={true}
				// 週數格式 e.g. short - W 6 ; narrow - W6 ; numeric - 6
				weekNumberFormat={{ week: "numeric" }}
				viewClassNames={"custom_calendar"}
				// 日期去掉"日"的顯示
				dayCellContent={(arg) => {
					return arg.date.getDate();
				}}
				// eventBackgroundColor="pink"
				locale={zhTwLocale}
				// 確定日名稱和周名稱是否可點擊
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
				height={"100vh"}
			/>
		</>
	);
};

export default Home;
