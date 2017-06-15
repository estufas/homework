// Your code goes here
var family = {};

var addButton = document.getElementsByClassName("add");
//
addButton[0].onclick = function(e) {
  e.preventDefault();
  grabValues();
};

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
  familyMember = Object.keys(family).length + 1
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
  if (isInteger(checkAge) == false) {
    return false;
  };
  if (checkAge == false || checkAge < 1) {
    return false;
  };
  if (relation.value == "") {
    return false;
  };
  return true;
}

function isInteger(n) {
  return n === +n && n === (n|0);
}

var addMemberToDom = function() {
  var div = document.createElement('div');
  div.className = 'new-member';
  var divText = familyMember + '.' +'<br>' + 'Age: ' + member['age'] + '<br>'
  + 'Relation: ' + member['relation']
  div.innerHTML = '<span class="member">' + divText + '</span>';
  document.body.appendChild(div);
}

var removeFamilyMemember = function() {
  // code here
}

var submitFamily = function() {
  jsonFamily = JSON.stringify(family);
  console.log(jsonFamily);
}
