import React, { useCallback, useRef, useEffect } from 'react'
import moment from 'moment-jalaali'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './rtl.mdx'
const customFormats = {
  dateFormat: 'jDD',
  dayFormat: 'jDD dddd',
  weekdayFormat: 'dddd',

  timeGutterFormat: 'LTS',

  monthHeaderFormat: 'jMMMM jYYYY',
  dayHeaderFormat: 'dddd - jDD jMMMM',

  agendaDateFormat: 'dddd jDD jMMMM',
  agendaTimeFormat: 'LTS',
}
moment.loadPersian({ dialect: 'persian-modern' })
const mLocalizer = momentLocalizer(moment, customFormats)
function buildMessage(slotInfo) {
  return `[onSelectSlot] a date selection was made, passing 'slotInfo'
  ${JSON.stringify(slotInfo, null, 2)}`
}

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
const Template = (args) => {
  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])
  const onSelectSlot = useCallback((slotInfo) => {
    /**
     * Here we are waiting 250 milliseconds prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(buildMessage(slotInfo))
    }, 250)
  }, [])
  return (
    <div className="height600">
      <Calendar {...args} selectable onSelectSlot={onSelectSlot} />
    </div>
  )
}

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
