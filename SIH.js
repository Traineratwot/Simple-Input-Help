/*jshint esversion: 6 */
class SIH {

	constructor(selector = '', datalist = {}, hotUpdate = false) {
		this.selector = selector;
		this.datalist = datalist;
		this.elem = $(selector);
		this.hotUpdate = hotUpdate
		if (this.elem.length == 0) {
			return false;
		}
		if (this.elem.length > 1) {
			console.warn('Input задан неоднозначно ' + selector)
			return false;
		}
		var self = this;
		this.ini()
		this.elem.on('focus', function () {
			self.show();
		})
		this.elem.on('blur', function () {
			self.hide();
		})
		if (this.hotUpdate) {
			this.elem.on('input', function () {
				self.ini();
			});
		}

	}

	ini() {
		if (this.elem.length == 0) {
			return false;
		}
		var helplist = $('<div>');
		var type = Array.isArray(this.datalist)
		for (var key in this.datalist) {
			if (this.datalist.hasOwnProperty(key)) {
				var element = this.datalist[key];
				var li = $('<li>')
				li.attr('data-input', this.selector)
				if (type) {
					switch (typeof element) {
						case 'string':
							var tv = element.split(":");
							if (tv.length == 2) {
								element = tv['1'];
								li.text(tv[0]);
							} else {
								li.text(element);
							}
							break;
						case 'date':

							break;

						default:
							li.text(element)
							break;
					}
				} else {
					switch (typeof element) {
						case 'object':
							switch (element.constructor.name) {
								case 'date':

									break;

								default:
									break;
							}
							break;

						default:
							li.text(key)
							break;
					}
				}
				li.attr('data-value', element);
				li.appendTo(helplist);

			}
		}
		this.helplist = helplist;
	}
	show() {
		if (this.elem.length == 0) {
			return false;
		}
		if (!this.helplist) {
			this.ini()
		}
		var self = this;
		this.helplist.appendTo('body')
		var height = parseFloat(this.elem.css('height')) + parseFloat(this.elem.css('padding-bottom')) + parseFloat(this.elem.css('border-bottom-width'));

		var width = parseFloat(this.elem.css('width')) + parseFloat(this.elem.css('padding-left')) + parseFloat(this.elem.css('padding-right')) + parseFloat(this.elem.css('border-right-width')) + parseFloat(this.elem.css('border-left-width')) - 5;
		this.style = {
			width: width + 'px',
			collor: this.elem.css('collor'),
			font: this.elem.css('font'),
			position: 'absolute',
			display: 'none',
		}
		this.helplist.css(this.style);
		this.helplist.addClass('datalist');
		this.helplist.offset({
			top: this.elem.offset().top + height,
			left: this.elem.offset().left
		});
		this.helplist.fadeIn(100)
		this.helplist.find('li').on('click', function () {
			self.elem.val($(this).attr('data-value'));
		})
	}
	hide() {
		if (this.elem.length == 0) {
			return false;
		}
		setTimeout(() => {
			this.helplist.fadeOut(100);
			this.helplist.remove();
			this.helplist = null;
		}, 200);
	}
}