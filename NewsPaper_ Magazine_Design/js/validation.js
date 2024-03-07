// Validation 

var options = {
    "email": {
        "Email": "The email is not valid"
    },
    "number": {
        "NotBlank": "The identifier is required",
    },
    "name": {
        "NotBlank": "The field 'given' must be filled in",
        "Regex": "The name field is invalid."
    },

    "message": {
        "NotBlank": "The field is required"
    },
    "subject": {
        "NotBlank": "The field is required"
    },
    "uploadImages":{
        "NotBlank": "The field is required"
    }
};

$.fn.ifaBSValidation = function (messages, options) {
    "use strict";

    if (!this.length) {
        return this;
    }

    var pluginName = '[ifaBSValidation]';

    if (typeof ($.fn.modal) === 'undefined') {
        // Bootstrap not loaded
        console.error(pluginName, 'Bootstrap not loaded !');
        return;
    }

    var settings = $.extend({
        valueMissing: {
            constraints: ['NotNull', 'NotBlank'],
            defaultMessage: "The field is required"
        },
        typeMismatch: {
            constraints: ['Email'],
            defaultMessage: "Field is invalid"
        },
        patternMismatch: {
            constraints: ['Regex'],
            defaultMessage: "Field is invalid"
        },
        stepMismatch: {
            constraints: ['file'],
            defaultMessage: "[stepMismatch] Field is invalid"
        },
        tooLong: {
            constraints: ['Range', 'Length'],
            defaultMessage: "[tooLong] Field exceeds {{ value }} characters"
        }
    }, options);

    return this.each(function () {
        if (!$(this).is('form')) {
            console.error(pluginName, "Choosen element is not a form");
            return;
        }

        var $form = $(this);

        $form.attr('novalidate', true);

        $form.submit(function (event) {
            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            $form
                .addClass("was-validated")
                .find("input, select, textarea")
                .filter(":visible")
                .each(function () {
                    if (!this.validity.valid) {
                        $(this)
                            .siblings(".invalid-feedback")
                            .remove();
                    }

                    var field = this.name.split('[').pop().slice(0, -1);
                    var mapping, msg;

                    if (this.validity.valueMissing) {
                        mapping = settings.valueMissing;
                        msg = mapping.defaultMessage;

                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint];
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.typeMismatch) {
                        mapping = settings.typeMismatch;
                        msg = mapping.defaultMessage;
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint];
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.patternMismatch) {
                        mapping = settings.patternMismatch;
                        msg = mapping.defaultMessage;
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint];
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.rangeOverflow) {
                        var max = this.max;
                        mapping = settings.rangeOverflow;
                        msg = mapping.defaultMessage;
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint]['max']
                                    ? messages[field][constraint]['max']
                                    : messages[field][constraint];

                                msg = msg.replace('{{ value }}', max);
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.rangeUnderflow) {
                        var min = this.min;
                        mapping = settings.rangeUnderflow;
                        msg = mapping.defaultMessage;
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint]['min']
                                    ? messages[field][constraint]['min']
                                    : messages[field][constraint]; console.log('min', min);

                                msg = msg.replace('{{ value }}', min);
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.stepMismatch) {
                        mapping = settings.stepMismatch;
                        msg = mapping.defaultMessage;
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint];
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }

                    if (this.validity.tooLong) {
                        var maxlength = this.maxlength;
                        mapping = settings.tooLong;
                        msg = mapping.defaultMessage.replace('/{{ value }}/', maxlength);
                        mapping.constraints.forEach(function (constraint) {
                            if (messages[field] && messages[field][constraint]) {
                                msg = messages[field][constraint]['max']
                                    ? messages[field][constraint]['max']
                                    : messages[field][constraint];

                                msg = msg.replace('{{ value }}', maxlength);
                            }
                        });

                        $('<div class="invalid-feedback">')
                            .append(msg)
                            .appendTo($(this).parent());
                    }
                });
        });
    });
};

$(function () {
    $('form').ifaBSValidation(options);
    $('[data-toggle="popover"]').popover();
    
});



//Uploaded image


$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
    $('.media').addClass('hide-element');
    $('#imagesUploadForm').submit(function (evt) {
        evt.preventDefault();
    });
    $('#edit').click(function () {
        console.log('click detected inside circl-o of edit');
        $('#edit').toggleClass('fa-circle-o').toggleClass('fa-check-circle');
        if ($('#edit').hasClass('fa-check-circle')) {
            $('#captionForImage').toggleClass('hide-element');
        } else {
            $('#captionForImage').toggleClass('hide-element');
        }
    });
    $('#delete').click(function () {
        console.log('click detected inside circl-o of delete');
        $('#delete').toggleClass('fa-circle-o').toggleClass('fa-times-circle');
    });
    //namespace variable to determine whether to continue or not
    var proceed = false;
    //Ensure that FILE API is supported by the browser to proceed
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        if (window.webkitURL || window.URL) {
            $('#errorMessaage').removeClass('hide-element').addClass(
                'alert-success').html('<span class="glyphicon glyphicon-ok"></span>\n\
            <span class="sr-only">Success:</span>Great your browser is compatiblle for Files API. \n\
Enjoy the demo');
            proceed = true;
        } else {
            $('#errorMessaage').removeClass('hide-element').addClass(
                'alert-warning').html('<span class="glyphicon glyphicon-exclamation-sign"></span>\n\
            <span class="sr-only">Warning:</span>The browser does not support few APIs used in this demo.\n\
But we will be back with a solution.');
        }

    } else {
        $('#errorMessaage').removeClass('hide-element').addClass(
            'alert-warning').html('<span class="glyphicon glyphicon-exclamation-sign"></span>\n\
            <span class="sr-only">Warning:</span>Snap looks like you still live in stone age. \n\
Wake up..Time to update the browser');
    }
    if (proceed) {
        var input = "";
        var formData = new FormData();
        $('input[type=file]').on("change", function (e) {
            var counter = 0;
            var modalPreviewItems = "";
            input = this.files;
            $($(this)[0].files).each(function (i, file) {
                formData.append("file[]", file);
            });
            $('#previewImages').removeClass('hide-element');
            $('#imagesUpload').removeClass('disabled');
            var successUpload = 0;
            var failedUpload = 0;
            var extraFiles = 0;
            var size = input.length;
            $(input).each(function () {
                var reader = new FileReader();
                var uploadImage = this;
                console.log(this);
                reader.readAsArrayBuffer(this);
                reader.onload = function (e) {
                    var magicNumbers = validateImage.magicNumbersForExtension(e);
                    var fileSize = validateImage.isUploadedFileSizeValid(uploadImage);
                    var extension = validateImage.uploadFileExtension(uploadImage);
                    var isValidImage = validateImage.validateExtensionToMagicNumbers(magicNumbers);
                    var thumbnail = validateImage.generateThumbnail(uploadImage);
                    if (fileSize && isValidImage) {
                        $('#' + counter).parents('.media').removeClass('hide-element');
                        $('#' + counter).attr('src', thumbnail).height('200');
                        $('#uploadDataInfo').removeClass('hide-element').addClass('alert-success');
                        successUpload++;
                        modalPreviewItems += carouselInsideModal.createItemsForSlider(thumbnail, counter);

                    } else {
                        $('#uploadDataInfo').removeClass('hide-element alert-success').addClass('alert-warning');
                        failedUpload++;
                    }
                    counter++;
                    if (counter === size) {
                        $('#myCarousel').append(carouselInsideModal.createIndicators(successUpload, "myCarousel"));
                        $('#previewItems').append(modalPreviewItems);
                        $('#previewItems .item').first().addClass('active');
                        $('#carouselIndicators > li').first().addClass('active');
                        $('#myCarousel').carousel({
                            interval: 2000,
                            cycle: true
                        });
                        if (size > 2) {
                            $('#toManyFilesUploaded').html("Only files displayed below will be uploaded");
                            extraFiles = size - 2;
                        }
                        $('#filesCount').html(successUpload + " files are ready to upload");
                        if (failedUpload !== 0 || extraFiles !== 0) {
                            failedUpload === 0 ? "" : failedUpload;
                            extraFiles === 0 ? "" : extraFiles;
                            $('#filesUnsupported').html("Please choose correct File format");
                        }

                    }
                };
            });
        });

        $(document).on('click', '.glyphicon-remove-circle', function () {
            $('#file-error-message').addClass('hide-element');
        });
        $("body").on("click", ".media-object", function () {
            var image = $(this).attr('src');
            $("#individualPreview").attr('src', image);
            var tags = [];
            var displayTagsWithFormat = "";
            ($(this).parents('.media').find('input[type="text"]')).each(function () {
                if ($(this).attr('name') === 'tags') {
                    tags = $(this).val().split(",");
                    $.each(tags, function (index) {
                        displayTagsWithFormat += "<span class = 'label-tags label'>#" + tags[index] + "  <i class='fa fa-times'></i></span>";
                    });
                    $("#displayTags").html("<div class='pull-left'>" + displayTagsWithFormat + "</div>");
                    //console.log(tags);
                }
            });
        });
        var toBeDeleted = [];
        var eachImageValues = [];
        $('.media').each(function (index) {
            var imagePresent = "";
            $("body").on("click", "#delete" + index, function () {
                imagePresent = $("#" + index).attr('src');
                $("#undo" + index).removeClass('hide-element');
                $("#" + index).attr('src', './img/200x200.gif');
                $("#delete" + index).addClass('hide-element');
                toBeDeleted.push(index);
                //console.log(toBeDeleted);                      
                $("#delete" + index).parent().find('input[type="text"]').each(function () {
                    var attribute = $(this).attr('name');
                    var attributeValue = $(this).val();
                    eachImageValues[attribute + index] = attributeValue;
                    //console.log(eachImageValues);

                });
                //console.log(toBeDeleted.length);
                if (toBeDeleted.length === 4) {
                    $('#sendImagesToServer').prop('disabled', true).html('No Files to Upload');

                } else {
                    $('#sendImagesToServer').prop('disabled', false).html('Update &amp; Preview');
                }

                $("#delete" + index).parent().find('input[type="text"]').prop('disabled', true).addClass('disabled');
            });
            $("body").on("click", "#undo" + index, function () {
                $("#" + index).attr('src', imagePresent);
                $("#undo" + index).addClass('hide-element');
                $("#delete" + index).removeClass('hide-element');
                var indexToDelete = toBeDeleted.indexOf(index);
                if (indexToDelete > -1) {
                    toBeDeleted.splice(indexToDelete, 1);
                    // console.log(toBeDeleted);
                    $("#delete" + index).parent().find('input[type="text"]').prop('disabled', false).removeClass('disabled');
                }
                if (toBeDeleted.length === 4) {
                    $('#sendImagesToServer').prop('disabled', true).html('No Files to Upload');

                } else {
                    $('#sendImagesToServer').prop('disabled', false).html('Update &amp; Preview');
                }
            });
        });
        $('body').on("click", "#sendImagesToServer", function () {

            var counter = 0;
            var imageData = "";
            var consolidatedData = [];
            $('.media').each(function () {
                var description = "";
                var caption = "";
                var tags = "";
                $('.media').find('input[type="text"]').each(function (index) {
                    if ((index === 0 || index <= 11) && counter <= 11) {
                        counter++;
                        var attributeName = "";
                        var attributeValue = "";

                        attributeName = $(this).attr('name');
                        attributeValue = $(this).val();
                        switch (attributeName) {
                            case "description":
                                description = attributeValue;
                                // console.log(description);
                                break;
                            case "caption":
                                caption = attributeValue;
                                // console.log(caption);
                                break;
                            case "tags":
                                tags = attributeValue;
                                // console.log(tags);
                                break;
                            default:
                                break;
                        }
                        if (counter % 3 === 0) {
                            imageData = new imageInformation(description, caption, tags);
                            consolidatedData.push(imageData);
                            //JSON.stringify(consolidatedData);                        
                            //console.log(toBeDeleted);
                        }
                    }
                });
            });
            imageData = new deleteList(toBeDeleted);
            consolidatedData.push(imageData);
            var sendData = JSON.stringify(consolidatedData);
            formData.append("important", sendData);
            $.ajax({
                type: 'POST',
                url: 'upload.php',
                xhr: function () {
                    var customXhr = $.ajaxSettings.xhr();
                    if (customXhr.upload) {
                        customXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                    }
                    return customXhr;
                },
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#ajaxLoad').addClass('hide-element');
                    $('#successResponse').html(data.message);
                    console.log(data.message + " inside success function");
                },
                error: function (data) {
                    $('#successResponse').html(data.responseJSON.message).addClass('label label-danger').css({
                        'font-size': '18px'
                    });
                    console.log(data.responseJSON.message + " inside error function");
                }
            });

            function progressHandlingFunction(e) {
                if (e.lengthComputable) {
                    $('#progressIndicator').css({
                        'width': e.loaded
                    });
                }
            };
            //
            //console.log(JSON.stringify(consolidatedData));
        });

        function imageInformation(description, caption, tags) {
            this.description = description;
            this.caption = caption;
            this.tags = tags;
        };

        function deleteList(toBeDeleted) {
            this.toBeDeleted = toBeDeleted;
        };
        var validateImage = {
            magicNumbersForExtension: function (event) {
                var headerArray = (new Uint8Array(event.target.result)).subarray(0, 4);
                var magicNumber = "";
                for (var counter = 0; counter < headerArray.length; counter++) {
                    magicNumber += headerArray[counter].toString(16);
                }
                return magicNumber;
            },
            isUploadedFileSizeValid: function (fileUploaded) {
                var fileSize = fileUploaded.size;
                var maximumSize = 2097125;
                var isValid = "";
                if (fileSize <= maximumSize) {
                    isValid = true;
                } else {
                    isValid = false;
                }
                return isValid;
            },
            uploadFileExtension: function (fileUploaded) {
                var fileExtension = "";
                var imageType = "";
                imageType = fileUploaded.type.toLowerCase();
                fileExtension = imageType.substr((imageType.lastIndexOf('/') + 1));
                return fileExtension;
            },
            validateExtensionToMagicNumbers: function (magicNumbers) {
                var properExtension = "";
                if (magicNumbers.toLowerCase() === "ffd8ffe0" || magicNumbers.toLowerCase() === "ffd8ffe1" ||
                    magicNumbers.toLowerCase() === "ffd8ffe8" ||
                    magicNumbers.toLocaleLowerCase() === "89504e47") {
                    properExtension = true;

                } else {
                    properExtension = false;
                }
                return properExtension;
            },
            generateThumbnail: function (uploadImage) {
                if (window.URL)
                    imageSrc = window.URL.createObjectURL(uploadImage);
                else
                    imageSrc = window.webkitURL.createObjectURL(uploadImage);
                return imageSrc;
            }
        };
        var carouselInsideModal = {
            createIndicators: function (carouselLength, dataTarget) {
                var carouselIndicators = '<ol class = "carousel-indicators" id="carouselIndicators">';
                for (var counter = 0; counter < carouselLength; counter++) {
                    carouselIndicators += '<li data-target = "#' + dataTarget + '"data-slide-to="' + counter + '"></li>';
                }
                carouselIndicators += "</ol>";
                return carouselIndicators;
            },
            createItemsForSlider: function (imgSrc, counter) {
                var item = '<div class = "item">' + '<img src="' + imgSrc + '" id="preview' + counter + '" /></div>';
                return item;
            }
        };
    }
});