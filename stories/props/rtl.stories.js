import React from 'react'
import moment from 'moment-jalaali'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './rtl.mdx'

const mLocalizer = momentLocalizer(moment)
moment.loadPersian({ dialect: 'persian-modern' })

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: {
      control: {
        type: null,
      },
    },
    rtl: 'boolean',
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

// TODO: localize example for Arabic
const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const RightToLeft = Template.bind({})
RightToLeft.storyName = 'rtl'
RightToLeft.args = {
  defaultDate: new Date(2022, 9, 9),
  events: demoEvents,
  localizer: mLocalizer,
  rtl: true,
  messages: {
    week: 'هفته',
    work_week: 'هفته کاری',
    day: 'روز',
    month: 'ماه',
    previous: 'قبل',
    next: 'بعد',
    today: 'امروز',
    agenda: 'جدول',
    date: 'تاریخ',
    time: 'زمان',
    event: 'رویداد',
    allDay: 'همه ی روز',
    yesterday: 'دیروز',
    tomorrow: 'فردا',

    noEventsInRange: 'There are no events in this range.',
    showMore: function showMore(total) {
      return '+' + total + ' بیشتر'
    },
  },
}
