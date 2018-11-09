import React from 'react';
import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  FormattedRelative,
  FormattedNumber,
  FormattedPlural
} from 'react-intl';

/**
 * 国际化，包括字符串，日期，时间，时间戳和当前时间关系
 * type: message(default)|date|time|relative
 * @param {object} param0
 */
const Trans = ({
  transKey,
  transKeyPlural,
  values,
  pluralValue,
  type = 'message',
  currency = 'USD',
  decimal
}) => {
  if (type === 'message') {
    return <FormattedMessage tagName="span" id={transKey} values={values} />;
  }
  if (type === 'pluralMessage') {
    //only support one value param
    return (
      <FormattedPlural
        value={pluralValue}
        one={<FormattedMessage tagName="span" id={transKey} values={values} />}
        other={
          <FormattedMessage
            tagName="span"
            id={transKeyPlural}
            values={values}
          />
        }
      />
    );
  } else if (type === 'date') {
    return (
      <FormattedDate
        tagName="span"
        value={values}
        year="numeric"
        month="short"
        day="2-digit"
      />
    );
  } else if (type === 'time' && values) {
    return <FormattedTime tagName="span" value={values} />;
  } else if (type === 'relative' && values) {
    return (
      <FormattedRelative tagName="span" value={values} updateInterval={1000} />
    );
  } else if (type === 'number') {
    if (isNaN(values)) {
      return '';
    }
    return <FormattedNumber value={values || isNaN(values) ? values : 0} />;
  } else if (type === 'currency') {
    if (isNaN(values)) {
      return '';
    }
    return (
      <FormattedNumber
        style="currency"
        value={values ? values : 0}
        currency={currency}
        currencyDisplay="symbol"
        minimumFractionDigits={decimal ? decimal : 0}
        maximumFractionDigits={decimal ? decimal : 0}
      />
    );
  } else {
    return '';
  }
};

export default Trans;
