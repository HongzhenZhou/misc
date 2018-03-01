
var SpecialStockIDs = {
	//����
	"601318": null, //�й�ƽ��
	"601336": null, //�»�����
	"601628": null, //�й�����
	"601601": null, //�й�̫��

	//ȯ��
	/*
	"000562": null, //��Դ֤ȯ
	"000686": null, //����֤ȯ
	"000728": null, //��Ԫ֤ȯ
	"000750": null, //����֤ȯ
	"000776": null, //�㷢֤ȯ
	"000783": null, //����֤ȯ
	"002500": null, //ɽ��֤ȯ
	"002673": null, //����֤ȯ
	"600030": null, //����֤ȯ
	"600109": null, //����֤ȯ
	"600369": null, //����֤ȯ
	"600837": null, //��֤ͨȯ
	"600999": null, //����֤ȯ
	"601099": null, //̫ƽ��
	"601377": null, //��ҵ֤ȯ
	"601555": null, //����֤ȯ
	"601688": null, //��̩֤ȯ
	"601788": null, //���֤ȯ
	"601901": null, //����֤ȯ
	*/
	//����
	"600643": null, //��������
	"000563": null, //�¹�Ͷ
	"600816": null, //��������

	//����
	"002839": null, //�żҸ���
	"601997": null, //��������
	"600919": null, //��������
	"601229": null, //�Ϻ�����
	"600926": null, //��������
	"601128": null, //��������
	"603323": null, //�⽭����
	"600908": null, //��������
	"002807": null, //��������
	"601398": null, //��������
	"601988": null, //�й�����
	"002142": null, //��������
	"601166": null, //��ҵ����
	"601169": null, //��������
	"600015": null, //��������
	"600036": null, //��������
	"600016": null, //��������
	"601009": null, //�Ͼ�����
	"601288": null, //ũҵ����
	"601818": null, //�������
	"601939": null, //��������
	"601998": null, //��������
	"601328": null, //��ͨ����
	"000001": null, //ƽ������
	"600000": null  //�ַ�����
};


function getDataBySID(arg, fok, ferror)
{
	var xhr = null;
	var data = null;

	if (!arg || arg == "" || !arg.match(/^[0-9]{6,9}$/i))
	{ 
		alert("getDataBySID() need valid arguments!");
		return ferror(null);
	}

	if (arg in SpecialStockIDs)
	{
		alert("Couldn't parse this stock: " + arg + "!");
		return ferror(null);
	}

	if (sessionStorage && sessionStorage[arg])
	{
		data = JSON.parse(sessionStorage[arg]);
		fok(data);
	}
	else
	{
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				try
				{
					data = JSON.parse(xhr.responseText);
				}
				catch(e)
				{
					data = null;
				}

				if (xhr.status != 200 || !data)
					ferror(data);
				else
				{
					if (sessionStorage)
						sessionStorage[arg] = xhr.responseText;
					fok(data);
				}
			}
		}

		xhr.open("GET", "/d/" + arg, true);
		xhr.send();
	}
}

function searchStockBySIDOrAbbr(arg, fok, ferror)
{
	var xhr = new XMLHttpRequest();
	var data = null;

	if (!arg || arg == "" || !arg.match(/^([0-9]{6,9}|[a-z\*]{3,9})$/i))
	{ 
		alert("searchStockBySIDOrAbbr() need a valid argument!");
		return ferror(null);
	}

	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			try
			{
				data = JSON.parse(xhr.responseText);
			}
			catch(e)
			{
				data = null;
			}

			if (xhr.status == 200 && data)
				fok(data);
			else
				ferror(data);
		}
	}

	xhr.open("GET", "/q/" + arg, true);
	xhr.send();
}


