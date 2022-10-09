import SliderView from 'components/adapt-contrib-slider/js/sliderView';
import a11y from 'core/js/a11y';

class SurveyScaleView extends SliderView {

  preRender() {
    if (this.model?.get('_isSubmitted') && !this.model.get('_isSubmitted')) {
      this.model.set('_isEnabled', true);
    }
    super.preRender();
  }

  setupQuestion() {
    super.setupQuestion();
  }

  enableQuestion() {
    if (this.model.get('_isReady')) this.setAllItemsEnabled(true);
    a11y.toggleEnabled(this.$('.js-btn-action'), true);
  }

  disableQuestion() {
    if (this.model.get('_isReady')) this.setAllItemsEnabled(false);
    a11y.toggleEnabled(this.$('.js-btn-action'), false);
  }
 
  onQuestionRendered() {
    super.onQuestionRendered();
    this.setDufaultRating();
    if (!(this.model.get('_isSubmitted') && this.model.has('_userAnswer'))) return;
    this.model.set({
      feedbackTitle: this.model.get('title'),
      feedbackMessage: this.model.getFeedbackString()
    });
  }

  setDufaultRating(){
    if (this.model.get('_isSubmitted')) return;
    const itemValue = this.model.get('_defaultSelectedItem');
    const index = super.getIndexFromValue(itemValue);
    super.selectItem(index);
    super.handleSlide(undefined,index);
    super.setSliderValue(itemValue);
  }

  onScreenSizeChanged() {
    super.onScreenSizeChanged();
    if (!this.model?.get('_isReady')) return;
  }

}

SurveyScaleView.template = 'surveyScale.jsx';

export default SurveyScaleView;
