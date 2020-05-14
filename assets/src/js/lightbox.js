const setupPhotoSwipe = function(items, clickedIndex) {
  var pswpElement = $('.pswp')[0];

  var options = {
    shareEl: false,
    fullscreenEl: false,
    zoomEl: false,
    index: clickedIndex
  };

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.listen('gettingData', function (index, item) {
    if (item.w < 1 || item.h < 1) {
      var img = new Image();
      img.onload = function () {
          item.w = this.width;
          item.h = this.height;
          gallery.updateSize(true);
      };
      img.src = item.src;
    }
  });
  gallery.init();
}

export const buildItemsFromImageBlocks = function() {
  const imageBlocks = $('.wp-block-image');

  const items = [];
  imageBlocks.each(function() {
    const tempImage = {};
    tempImage.src = $(this).find('img').attr('src');
    tempImage.w = 0;
    tempImage.h = 0;

    const caption = $(this).find('figcaption');
    if (caption.length) {
      tempImage.title = caption.text();
    }

    items.push(tempImage);
  });

  return items;
}

export const buildItemsFromGallery = function(galleryImages) {
  const items = [];
  galleryImages.each(function() {
    const tempImage = {};
    tempImage.src = $(this).attr('src') ? $(this).attr('src') : $(this).attr('data-src');
    tempImage.w = 0;
    tempImage.h = 0;

    const caption = $(this).attr('alt');
    if (caption.length) {
      tempImage.title = caption;
    }

    items.push(tempImage);
  });

  return items;
}


export const setupLightBox = function($) {
  'use strict';

  $('.post-content .wp-block-image img, .page-template .wp-block-image img').each(
    function (clickedImageIndex) {
      const galleryItemsFromImageBlocks = buildItemsFromImageBlocks();

      $(this).off('click').on('click', () => {
        setupPhotoSwipe(galleryItemsFromImageBlocks, clickedImageIndex);
      });
    }
  );

  $('.block.gallery-grid img').each(
    function (clickedImageIndex) {
      const clickedImage = this;
      const galleryImages = $(clickedImage).closest('.gallery-grid').find('img');
      const galleryItems = buildItemsFromGallery(galleryImages);

      $(this).off('click').on('click', () => {
        setupPhotoSwipe(galleryItems, clickedImageIndex);
      });
    }
  );
};
