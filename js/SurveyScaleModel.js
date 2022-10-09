import Adapt from 'core/js/adapt';
import SliderModel from 'components/adapt-contrib-slider/js/sliderModel';

export default class SurveyScaleModel extends SliderModel {

  init() {
    super.init();
  }

  setupDefaultSettings() {
    super.setupDefaultSettings();
    this.set('_canShowModelAnswer', false);
    if (!this.has('_attempts') || this.get('_attempts') > 1) this.set('_attempts', 1);
  }

  setupModelItems() {
    const items = [];
    const start = this.get('_scaleStart') ?? 1;
    const end = this.get('_scaleEnd') ?? 1;
    const step = this.get('_scaleStep') || 1;
    for (let i = start; i <= end; i += step) {
      items.push({
        value: i,
        selected: false,
        correct: true
      });
    }
    this.set({
      _items: items,
      _marginDir: (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left')
    });
  }

  setupFeedback() {
    this.set({
      feedbackTitle: this.get('title'),
      feedbackMessage: this.getFeedbackString()
    });
  }

  /* override */
  updateButtons() {
    if (this.get('_attempts') > 0) return super.updateButtons();
    this.set('_buttonState', this.get('_isEnabled') ? 'submit' : 'reset');
  }

  getFeedbackString() {
    const feedbackSeparator = this.get('_feedback').feedbackSeparator ?? '';
    const genericFeedback = this._getGenericFeedback();
    const comparisonFeedback = this._getComparisonFeedback();
    const thresholdFeedback = this._getThresholdFeedback();
    const feedbackString = [
      genericFeedback,
      comparisonFeedback,
      thresholdFeedback
    ].filter(Boolean).join(feedbackSeparator);
    return feedbackString;
  }


  _getGenericFeedback() {
    return this.get('_feedback').generic;
  }

  _getComparisonFeedback() {
    if (!this.get('_isSubmitted')) return;
    const ratingValue = this.get('_selectedItem').value;
    const rating = this.get('_userAnswer') ?? this.get('_selectedItem').value;
    const type = (rating < ratingValue)
      ? 'higher'
      : (rating > ratingValue)
        ? 'lower'
        : 'same';
    return this.get('_feedback')._comparison[type];
  }

  _getThresholdFeedback() {
    const feedbackList = this.get('_feedback')._threshold;
    if (!feedbackList) return;
    const ratingValue = this.get('_selectedItem').value;
    return feedbackList.find(({ _values }) => {
      if (ratingValue < _values._low || ratingValue > _values._high) return false;
      return true;
    })?.text+`Rating:${ratingValue}` ?? '';
  }

}
