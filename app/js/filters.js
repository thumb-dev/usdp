four51.app.filter('onproperty', ['$451', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model];
		return $451.filter(input, query);
	}
}]);

four51.app.filter('kb', function() {
	return function(value) {
		return isNaN(value) ? value : parseFloat(value) / 1024;
	}
});

four51.app.filter('r', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key == value) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rc', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rl', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value.toLowerCase());
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('noliverates', function() {
	return function(value) {
		var output = [];
		angular.forEach(value, function(v) {
			if (v.ShipperRateType != 'ActualRates')
				output.push(v);
		});
		return output;
	}
});

four51.app.filter('paginate', function() {
	return function(input, start) {
		if (typeof input != 'object' || !input) return;
		start = +start; //parse to int
		return input.slice(start);
	}
});
four51.app.filter('shipperOrderWeight', function() {
    return function(shipper, order) {
        var orderWeight = 0;
        var output = [];
        angular.forEach(order.LineItems, function(item) {
            orderWeight += (item.Product.ShipWeight * item.Quantity);
        });

        angular.forEach(shipper, function(s) {
            if (orderWeight <= 150 && s.Name != "Bulk Shipping (over 150 lbs)") {
                output.push(s);
            } else if (orderWeight > 150 && s.Name == "Bulk Shipping (over 150 lbs)") {
                output.push(s);
            }
              });
        return output;
    }
});
four51.app.filter('shipperFilter', function() {
  return function(shipper, addresses, currentid) {
    var results = [];
    var addressFound = false;
    angular.forEach(addresses, function(address) {
      //locate the ship address that matches the current id
      if (address.ID == currentid) {
        //check to see if the selected address matches the special address(s)
        switch (address.AddressName) {
          case "Child Center":
            addressFound = true;
            break;
          case "FL001 Supercenter":
            addressFound = true;
            break;
          case "FL002 Hunter Crossing":
            addressFound = true;
            break;
          case "FL003 Archer Road":
            addressFound = true;
            break;
          case "FL004 Midtown":
            addressFound = true;
            break;
          case "FL005 Corporate (Buzz)":
            addressFound = true;
            break;
          case "FL006 Alachua":
            addressFound = true;
            break;
          case "FL007 Fleming Island":
            addressFound = true;
            break;
          case "FL008 Mandarin (coming soon)":
            addressFound = true;
            break;
          case "FL009 Oviedo":
            addressFound = true;
            break;
          case "FL010 Altamonte Springs":
            addressFound = true;
            break;
          case "FL011 Village South":
            addressFound = true;
            break;
          case "FL012 Village North":
            addressFound = true;
            break;
          case "FL013 Palencia Montessori Academy":
            addressFound = true;
            break;
          case "GA014 Old Milton":
            addressFound = true;
            break;
          case "GA015 Jones Bridge":
            addressFound = true;
            break;
          case "FL016 Wellington":
            addressFound = true;
            break;
          case "FL017 Royal Palm Beach":
            addressFound = true;
            break;
          case "FL018 East Boynton Beach":
            addressFound = true;
            break;
          case "FL019 West Boynton Beach":
            addressFound = true;
            break;
          case "FL020 West Palm Beach Sedona":
            addressFound = true;
            break;
          case "FL021 Casselberry":
            addressFound = true;
            break;
          default:
            addressFound = false;
        }
      }
    });
    //loop through the shippers and only add the special shipper if the special address(s) was / were found
    angular.forEach(shipper, function(s) {
      if (s.Name.indexOf('Ship To My School') != -1) {
        if (addressFound) {
          results.push(s);
        }
      } else {
        if (!addressFound) {
          results.push(s);
        }
      }
    });

    return results;
  }
});
four51.app.filter('filterShippingMethods', function () {
    return function (shipaddresses, currentOrder) {
        var methods = [];
        var usesCustomShipper = false;
        angular.forEach(currentOrder.LineItems, function (item) {
            if (item.Product.StaticSpecGroups && item.Product.StaticSpecGroups.CustomShipper && item.Product.StaticSpecGroups.CustomShipper.Specs['User Custom Shipper'].Value === 'True') {
                usesCustomShipper = true;
            }
        });
        angular.forEach(shipaddresses, function (address) {
            if (usesCustomShipper) {
                if (address.AddressName === 'FL016 Wellington') {
                    methods.push(address);
                }
            } else {
                if (address.AddressName !== '') {
                    methods.push(address);
                }
            }
        });
        return methods;
    }
});

