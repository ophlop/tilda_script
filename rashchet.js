<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;
            apikey=<ca3fc37c-7d39-44bb-9323-10cc53cc78ac>"
            type="text/javascript">
</script>

ymaps.ready(init);

function init() {
    
        myMap = new ymaps.Map('map', {
            center: [53.2006600, 45.0046400],
            zoom: 12,
            controls: []
        }),
		
		/*t-input.where_form = new ymaps.control.SearchControl({
			options: {
				 size: 'large',
				 provider: 'yandex#search'*/
			}
		});
    // Создадим панель маршрутизации.
        routePanelControl = new ymaps.control.RoutePanel({
            options: {
                // Добавим заголовок панели.
                showHeader: true,
                title: 'Расчёт доставки'
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: 'small',
                float: 'none',
                position: {
                    bottom: 145,
                    right: 10
                }
            }
        });
    // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({
        types: {auto: true}
    });

    //Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
    routePanelControl.routePanel.state.set({
        fromEnabled: false,
        from: 'Пенза, улица Лермонтова, 36А'
	toEnable: false,
	to: document.getElementByID('t-input-block where_form').value;
	    
	    /*function searchURL() {
	    window.location = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp" + (input text value);
            }*/
		}
     });

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function (route) {

        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {

            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                var length = route.getActiveRoute().properties.get("distance"),
                // Вычислим стоимость доставки.
                    price = calculate(Math.round(length.value / 1000)),
            }
        });

    });
    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
      let finalPrice;

      if (routeLength <= 5 && routeLength >= 0) {
        if (routeLength >= 2.5) {
          finalPrice = 200;
        } else {
          finalPrice = 0;
        }
      } else {
        console.error('err');
      }
      
      return finalPrice;
    }
/*var finalPrice
document.getElementsBytagname('t-input-subtitle t-descr t-descr_xxs t-opacity_70 lenght_info')[0].innerHTML = finalPrice;
}
</script>
