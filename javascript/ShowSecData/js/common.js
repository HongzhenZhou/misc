
function getScrollOffsets(w)
{
	w = w || window;

	if (w.pageXOffset)
		return {x: w.pageXOffset, y: w.pageYOffset};

	if (w.document.compatMode == "CSS1Compat")
		return {x: w.document.documentElement.scrollLeft, y: w.document.documentElement.scrollTop};

	return {x: w.document.body.scrollLeft, y: w.document.body.scrollTop};
}

function floatDiv(a1, a2)
{
	var t1 = 0;
	var t2 = 0;
	var r1, r2;
	var t = 0;
	var isneg = false;

	if (a2 == 0 || a2 == 0.0)
		return null;

	if (a1 < 0)
	{
		//alert(a1.toString() + ' vs ' + a2.toString());
		isneg = true;
		a1 = Math.abs(a1);
	}

	a2 = Math.abs(a2);

	try
	{
		t1 = a1.toString().split('.')[1].length;
	}
	catch (e) {}

	try
	{
		t2 = a2.toString().split('.')[1].length;
	}
	catch (e) {}

	with (Math)
	{
		r1 = Number(a1.toString().replace('.', ''));
		r2 = Number(a2.toString().replace('.', ''));
		if (r2 == 0)
			return null;

		t = (r1 / r2) * pow(10, t2 - t1);
		if (isneg)
		{
			//var temp = t;
			t = 0 - t;
			//alert("orginal value: -" + temp.toString() + " vs " + "updated value: " + t.toString());
		}

		return parseFloat(t.toFixed(2));
	}

	return null;
}


