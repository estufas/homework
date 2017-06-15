
if (document.body.addEventListener) {
  document.body.addEventListener('click', myHandler, false);
} else {
  document.body.attachEvent('onclick', myHandler);
};

function myHandler(e){
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.className.match(/delete/)) {
    e.preventDefault();
    removeFamilyMemember(target);
  } else if (target.className.match(/add/)) {
    e.preventDefault();
    grabValues();
  } else if (target.type == "submit") {
    e.preventDefault();
    submitFamily();
  }
};

var family = {};

var grabValues = function() {
  var form = document.getElementsByTagName('form');
  var inputs = form[0].getElementsByTagName('input');
  var relation = form[0].getElementsByTagName('select');
  if (validateFields(inputs[0], relation[0])) {
    addFamilyMemember(inputs[0], inputs[1], relation[0])
  } else {
    alert('missed fields or age has to be positive')
  }
  clearValues(form[0]);
};

var clearValues = function(form) {
  form.reset();
};

var addFamilyMemember = function(age, smoker, relation) {
  member = {};
  var keys = Object.keys(family);
  var last;
  if (keys.length == 0) {
    last = 1
  } else {
    last = parseInt(keys[keys.length-1]) + 1;
  };
  familyMember = last;
  member['age'] = age.value
  if (smoker.checked) {
    member['smoker'] = true;
  } else {
    member['smoker'] = false;
  }
  member['relation'] = relation.value;
  family[familyMember] = member
  addMemberToDom(member);
};

var validateFields = function(age, relation) {
  checkAge = parseFloat(age.value)
  if (isInteger(checkAge) == false || checkAge == false || checkAge < 1) {
    return false;
  }
  if (relation.value == "") {
    return false;
  }
  return true;
};

function isInteger(n) {
  return n === +n && n === (n|0);
};

var addMemberToDom = function() {
  var div = document.createElement('div');
  div.className = familyMember;
  var divText = familyMember + '.' +'<br>' + 'Age: ' + member['age'] + '<br>'
  + 'Relation: ' + member['relation'] + '<br>'
  + '<button class="delete">delete</button>'
  div.innerHTML = divText;
  document.body.appendChild(div);
};

var removeFamilyMemember = function(element) {
  divClassName = parseInt(element.parentElement.className);
  delete family[divClassName];
  divRemove = element.parentElement;
  divParent = element.parentElement.parentElement;
  divParent.removeChild(divRemove);
  submitFamily();
};

var submitFamily = function() {
  jsonFamily = JSON.stringify(family);
  console.log(jsonFamily);
  pre = document.getElementsByClassName("debug");
  pre[0].innerHTML = ''
  pre[0].innerHTML = jsonFamily;
};
