enyo.kind({
  /*
   *  name:
   *  name of this "kind" (optionally namespaced with a .)
   */
  name: 'Slides.Main',
  /*
   *  components:
   *  Array of "kind" objects that compose the layout of your app
   */
  components: [
    {
      name: 'mainLayout',
      kind: 'FittableRows',
      classes: 'enyo-fit',
      components: [
        {
          kind: 'Slides.SlidesPane',
          name: 'slidesPanes',
          fit:  true,
          onTransitionFinish: 'updateProgress'
        },
        {
          kind: 'onyx.Toolbar',
          layoutKind: 'FittableColumnsLayout',
          components: [
            {
              kind: 'onyx.Button',
              allowHtml: true,
              content: '&larr; Back',
              onclick: 'previousSlide'
            },
            {
              kind: 'onyx.ProgressBar',
              name: 'slidesProgress',
              position: '0',
              style: 'height: 12px; margin: 10px !important;',
              fit: true
            },
            {
              kind: 'onyx.Button',
              allowHtml: true,
              content: 'Next &rarr;',
              onclick: 'nextSlide'
            }
          ]
        }
      ]
    }
  ],

  create: function() {
    // Has to be called to fire the super-class create method
    this.inherited(arguments);

    // Loop through the slides array to setup initial slides
    enyo.forEach(slideOrder, this.setupSlide, this);

    // Set the max of progress bar when slides are created
    var full = this.$.slidesPanes.getPanels().length;
    this.$.slidesProgress.max = full;

    // Update progress to the current slide
    this.updateProgress();

    // Special Palm device code?
    if(window.PalmSystem){
      window.PalmSystem.stageReady();
    }
  },

  setupSlide: function(kindName) {
    this.$.slidesPanes.addSlide({
      kind: kindName
    });
  },

  // Slide navigation
  nextSlide: function() {
    this.$.slidesPanes.next();
  },

  previousSlide: function() {
    this.$.slidesPanes.previous();
  },

  updateProgress: function() {
    // Animate progress bar to the current slide
    var current = this.$.slidesPanes.index + 1; // Zero based index
    this.$.slidesProgress.animateProgressTo( current );
  }
});

