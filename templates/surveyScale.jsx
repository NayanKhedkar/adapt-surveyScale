import Adapt from 'core/js/adapt';
import React from 'react';
import { classes, templates } from 'core/js/reactHelpers';

export default function SurveyScale(props) {
  const {
    _shouldShowMarking,
    _isInteractionComplete,
    _isEnabled,
    _isCorrect,
    labelStart,
    labelEnd,
    _userAnswer,
    _scaleStart,
    _scaleEnd,
    _marginDir
  } = props;

  const _globals = Adapt.course.get('_globals');

  return (
    <div className='component__inner slider__inner surveyscale__inner'>

      <templates.header {...props} />

      <div className={classes([
        'component__widget slider__widget',
        !_isEnabled && 'is-disabled',
        _isInteractionComplete && 'is-complete is-submitted show-user-answer',
        _shouldShowMarking && _isCorrect && 'is-correct',
        _shouldShowMarking && !_isCorrect && 'is-incorrect'
      ])}>

        <div className='slider__number-container'>

          {props._items.map(({ value }, index) =>
            <div className='slider__number js-slider-number js-slider-number-click'
              data-id={value}
              aria-hidden='true'
              key={index}>
              {value}
            </div>
          )}

          <div className='slider__number-model-range js-slider-model-range' />
          <div className='slider__number-answer' />
          <div className='slider__number-selection js-slider-number-selection a11y-ignore'
            aria-hidden='true'
            tabIndex={-1} />
        </div>

        <div className='slider__scale-container js-slider-scale'></div>
        <div className='slider__label-container js-slider-label-container'>
          {labelStart &&
            <label className='slider__label-start'
              aria-label={_globals._components._surveyScale.labelStart}>
              <span className='slider__label-start-inner'>
                {labelStart}
              </span>
            </label>
          }

          {labelEnd &&
            <label className='slider__label-end'
              aria-label={_globals._components._surveyScale.labelEnd}>
              <span className='slider__label-end-inner'>
                {labelEnd}
              </span>
            </label>
          }
        </div>
      </div>
      <div className='btn__container' />
    </div>

  );

}
