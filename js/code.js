class node
{
  constructor()
  {
    this.state;
    this.action = [];
    this.next = [];
    this.ntos;
    this.s;
  }
}

class head
{
  constructor()
  {
    this.start;
    this.end;
  }
}

class head_stack
{
  constructor()
  {
    this.h = [];
    this.htos;
  }
}
class Stack
{
  constructor()
  {
    this.items = [];
  }

  isEmpty()
  {
    return this.items.length == 0;
  }

  push(element)
  {
    this.items.push(element);
  }

  pop()
  {
    if (this.items.length == 0)
        return "Underflow";
    return this.items.pop();
  }

  stacktop()
  {
    return this.items[this.items.length - 1];
  }
}

function isoperand(ch)
{
    if((ch>='a')&&(ch<='z')||(ch>='A')&&(ch<='Z')||(ch>='0')&&(ch<='9')||(ch=='-'))
        return 1;
    return 0;
}

function ipr(ch)
{
    switch(ch)
    {
        case '|':return 1;
        case '.':return 2;
        case '(':return 3;
    }
}

function rpr(ch)
{
    switch(ch)
    {
        case '(':return 0;
        case '|':return 1;
        case '.':return 2;
    }
}

function convert(infix)
{
  let stack = new Stack();
  let l=infix.length;
  let ele;
  let k = 0;
  let post = [];
  for(let i=0;i<l;i++)
  {
      if(infix[i]=='(')
          stack.push(infix[i]);
      else if(infix[i]==')')
      {
          while(true)
          {
              ele=stack.pop();
              if(ele=='(')
                  break;
              post[k++]=ele;
          }
      }
      else if(isoperand(infix[i]))
          post[k++]=infix[i];
      else if(infix[i]=='*')
          post[k++]=infix[i];
      else if(infix[i]=='+')
          post[k++]=infix[i];
      else if(stack.isEmpty())
          stack.push(infix[i]);
      else if(ipr(infix[i])>rpr(stack.stacktop()))
          stack.push(infix[i]);
      else
      {
          while(stack.isEmpty()==0&&ipr(infix[i])<=rpr(stack.stacktop()))
          {
              ele = stack.pop();
              post[k++]=ele;
          }
          stack.push(infix[i]);
      }
  }
  while(!stack.isEmpty())
  {
      ele = stack.pop();
      post[k++] = ele;
  }
  return post;
}

function createData(t,post)
{
  let p,q;
  let h;
  p = new node();
  q = new node();
  h = new head();

  h.start = h.end = null;

  p.ntos = q.ntos = -1;

  p.ntos++;
  p.action[p.ntos] = post;
  p.next[p.ntos] = q;

  h.start = p;
  h.end = q;

  t.push(h);
}

function dotOperation(t)
{
  let p;
  let m,n;

  n = t.pop();
  m = t.pop();

  p = m.end;
  p.ntos++;
  p.action[p.ntos] = '-';
  p.next[p.ntos] = n.start;
  m.end = n.end;
  t.push(m);

}

function sumOperation(t)
{
  let p,q;
  let m,n;

  n = t.pop();
  m = t.pop();

  p = new node();
  q = new node();

  p.ntos = q.ntos = -1;

  p.ntos++;
  p.action[p.ntos] = '-';
  p.next[p.ntos] = m.start;

  p.ntos++;
  p.action[p.ntos]='-';
  p.next[p.ntos] = n.start;

  m.end.ntos++;
  m.end.action[m.end.ntos] = '-';
  m.end.next[m.end.ntos] = q;

  n.end.ntos++;
  n.end.action[n.end.ntos] = '-';
  n.end.next[n.end.ntos] = q;

  m.start = p;
  m.end = q;
  t.push(m);

}

function closerOperation(t)
{
    let m;
    let p,q;

    p = new node();
    q = new node();

    m = t.pop();

    p.ntos=q.ntos=-1;

    p.ntos++;
    p.action[p.ntos]='-';
    p.next[p.ntos]=m.start;

    m.end.ntos++;
    m.end.action[m.end.ntos]='-';
    m.end.next[m.end.ntos]=q;

    m.end.ntos++;
    m.end.action[m.end.ntos]='-';
    m.end.next[m.end.ntos]=m.start;

    p.ntos++;
    p.action[p.ntos]='-';
    p.next[p.ntos]=q;

    m.start=p;
    m.end = q;

    t.push(m);
}

function addCloserOperation(t)
{
    let m;
    let p,q;

    p = new node();
    q = new node();

    m = t.pop();

    p.ntos=q.ntos=-1;

    p.ntos++;
    p.action[p.ntos]='-';
    p.next[p.ntos]=m.start;

    m.end.ntos++;
    m.end.action[m.end.ntos]='-';
    m.end.next[m.end.ntos]=q;

    m.end.ntos++;
    m.end.action[m.end.ntos]='-';
    m.end.next[m.end.ntos]=m.start;

    m.start=p;
    m.end = q;

    t.push(m);
}


class queue
{
  constructor(q,v)
  {
    this.q=q;
    this.v=v;
  }
}

function doNumbering(h)
{
  let p,q;
  let list = [];
  let i;
  let states;

  q = h.start;
  i = 0;
  while(q!=null)
  {
    q.state = 'q'+i.toString();
    q.s = i;
    if(q.ntos!=0)
    {
      let temp = new queue(q,0);
      list.push(temp);
    }
    q = q.next[0];
    i++;
  }
  console.log("length of list is :"+list.length);
  while(list.length!=0)
  {
    let t = list.shift();
    console.log(t.q.state);
    p = t.q;
    let value = t.v;
    q = p.next[value+1];

    while(q.state==undefined)
    {
      q.state = 'q'+i.toString();
      q.s = i;
      if(q.ntos!=0)
      {
        let temp = new queue(q,0);
        list.push(temp);
      }
      q=q.next[0];
      i++;
    }

    if(p.ntos<value)
    {
      let temp = new queue(p,value+1);
      list.push(temp);
    }
  }
    states = i-1;
    return states;
}
function draw(post,he)
{
  let l=post.length;
  let h = new Stack();

  for(let i=0;i<l;i++)
  {
    if(isoperand(post[i]))
        createData(h,post[i]);
    else if(post[i]=='.')
        dotOperation(h);
    else if(post[i]=='|')
        sumOperation(h);
    else if(post[i]=='*')
        closerOperation(h);
    else if(post[i]=='+')
        addCloserOperation(h);

  }
  he = h.pop();
  he.end.next[0] =null;
  he.end.ntos = 0;
  return he;
}

function display(he)
{
  let p;
  p = he.start;
  while(p!=null)
  {
    console.log("At next p");
    for(let i=0;i<p.action.length;i++)
      console.log(p.action[i]);
    p = p.next[0];
  }
}

class row
{
  constructor()
  {
    this.x = [];
    this.y = [];
    this.z = [];
    this.xn;
    this.yn;
    this.zn = [];
  }
  initialize(z)
  {
    this.xn = 0;
    this.yn = 0;
    for(let i=0;i<z;i++)
    {
      this.z[i] = [];
      this.zn[i] = 0;
    }
  }
}

function bfs(p,symbol,temp,n)
{
  let nd;
  let visited = [];
  let q = [];
  //for(let i=0;i<100;i++)
//    visited[0] = 0;
  q.push(p);
  while(q.length!=0)
  {
    console.log("This is running");
    nd = q.shift();
    if(!temp.includes(nd))
    {
      if(nd.next[0]!==null)
        for(let i=0;i<=nd.ntos;i++)
        {
          console.log("Checking for "+nd.next[i].s);
          if(nd.action[i] == symbol && visited[nd.next[i].s]==undefined)
          {
            visited[nd.next[i].s] = 1;
            q.push(nd.next[i]);
          }
        }
      temp[n] = nd;
      console.log("Adding ",temp[n],"at n=",n);
      n+=1;
    }
  }
  console.log(temp);
  return n;
}

function isEqual(as,bs)
{
  let count = 0;
  if(as.length!=bs.length) return false;
  for(let i of as)
    for(let j of bs)
      if(i==j)
      {
        count++;
        break;
      }
  if(count==as.length)
    return true;
}

function isPresent(table,as)
{
  for(let i of table)
    if(isEqual(i.x,as))
      return true;
  return false;
}

function makeTable(h,zigma,states)
{
  let table = [];
  let z = zigma.length;
  table[0] = new row();
  table[0].initialize(zigma.length);
  table[0].x[table[0].xn++] = h.start;
  console.log(table[0].yn);
  let i = 0;
  let temp = 1;
  console.log("Current i is :"+i);
  while(table[i]!==undefined)
  {
    console.log("xn is ",table[i].x);
    for(let j=0;j<table[i].xn;j++)
    {
  //    console.log(table[j].yn);
      table[i].yn = bfs(table[i].x[j],'-',table[i].y,table[i].yn);
      console.log("Current j is ",j);
      console.log("current y is :",table[i].y);
    }
    console.log("New i=",i);
    for(let j=0;j<table[i].yn;j++)
      console.log(table[i].y[j].state)

    for(let j=0;j<table[i].yn;j++)
      for(let k=0;k<z;k++)
        if(table[i].y[j].action[0] == zigma[k])
        {
          table[i].z[k][table[i].zn[k]] = table[i].y[j].next[0];
          console.log("printing this  "+table[i].z[k][table[i].zn[k]].state);
          table[i].zn[k]++;
        }
    for(let k = 0;k<zigma.length;k++)
      for(let j=0;j<table[i].zn[k];j++)
        console.log(table[i].z[k][j].state);

    for(let j=0;j<z;j++)
    {
      console.log("Here for j =",j);
      console.log("size is",table[i].z[j].length);
      if(table[i].zn[j]!=0)
      {
        console.log("Going to check for",table[i].z[j]);
          if(!isPresent(table,table[i].z[j]))
          {
            console.log("We checked for",table[i].z[j]);
            console.log("Coming inside");
            console.log("Current temp is :"+temp);
            table[temp] = new row();
            table[temp].initialize(zigma.length);
            for(let k=0;k<table[i].zn[j];k++)
              table[temp].x[table[temp].xn++] = table[i].z[j][k];
            temp++;
          }
       }
    }
      if(table[i]==undefined)
        console.log("something fishy");
      i++;
  }
  console.log(table);
  console.log("Current temp is :"+temp);

  let dfa = [];
  let ndfa = [];
  for(let i=0;i<table.length;i++)
  {
    dfa[i] = [];
    ndfa[i] = [];
    dfa[i][0] = String.fromCharCode(97+i);
    ndfa[i][0] = i;
    for(let j=0;j<z;j++)
    {
        for(let k=0;k<table.length;k++)
        {
            console.log("Coming here");
            console.log("Going to check")
           console.log(table[k].x,"and",table[i].z[j]);
            if(table[i].zn[j]==0)
            {
                dfa[i][j+1] = '#';
                ndfa[i][j+1] = -1;
                break;
            }
            else if(isEqual(table[k].x,table[i].z[j]))
            {
                console.log("Match found");
                dfa[i][j+1] = String.fromCharCode(97+k);
                ndfa[i][j+1] = k;
                break;
            }
        }
    }
  }
  console.log("Going to print ndfa:");
  for(let i=0;i<table.length;i++)
    console.log(ndfa[i]);
  console.log(ndfa);
  let final_states = [];
  for(let i=0;i<table.length;i++)
    for(let j=0;j<table[i].y.length;j++)
      if(table[i].y[j]==h.end)
        final_states.push(String.fromCharCode(97+i));
  console.log(final_states);

  return [dfa,ndfa,final_states];
}

function minimize(dfa,ndfa,final_states)
{
  let box = [];
  for(let i=0;i<dfa.length;i++)
    box[i] = [];

  for(let i=0;i<dfa.length;i++)
    box[i][i] = true;

  for(let i=1;i<dfa.length;i++)
    for(let j=0;j<dfa.length-1;j++)
      if((final_states.includes(dfa[i][0]))^(final_states.includes(dfa[j][0])))
        box[i][j] = box[j][i] = false;
      else
        box[i][j] = box[j][i] = true;

  for(let i of box)
    console.log(i);

  change = true;
  console.log(ndfa);
  while(change == true)
  {
    change = false;
    for(let i=0;i<dfa.length;i++)
      for(let j=0;j<dfa.length-1;j++)
        for(let k=1;k<dfa[0].length;k++)
        {
          console.log("current:",ndfa[i][k],ndfa[j][k]);
          if((ndfa[i][k]!==-1) && (ndfa[j][k]!==-1))
          {
            if((box[ndfa[i][k]][ndfa[j][k]]==false))
            {
              if(box[i][j] == true)
                change = true;
              box[i][j] = box[j][i] = false;
            }
          }
          else if((ndfa[i][k]==-1) && (ndfa[j][k]!==-1))
          {
            if(box[i][j] == true)
              change = true;
            box[i][j] = box[j][i] = false;
          }

          else if((ndfa[i][k]!==-1) && (ndfa[j][k]==-1))
          {
            if(box[i][j] == true)
              change = true;
            box[i][j] = box[j][i] = false;
          }

        }
    console.log("Doing iteration");
  }
  console.log("After :");
  for(let i of box)
    console.log(i);

  let que = [];
  for(let i=1;i<box.length;i++)
    for(let j=0;j<i;j++)
      if(box[i][j]==true)
        que.push([i,j]);

  console.log(ndfa);
  while(que.length!==0)
  {
    let p = que.shift();
    console.log(p);
    for(let i=0;i<ndfa.length;i++)
      for(let j=1;j<ndfa[0].length;j++)
      {
        if(ndfa[i][j] == p[0])
        {
          ndfa[i][j] = p[1];
          dfa[i][j] = String.fromCharCode(p[1]+97);
        }
      }
    for(let i of que)
      for(let j of i)
        if(j == p[0])
          j = p[1];

    for(let i=0;i<ndfa.length;i++)
      if(ndfa[i][0] == p[0])
      {
        ndfa.splice(i,1);
        dfa.splice(i,1);
        break;
      }
    console.log("After:");
    console.log(ndfa);
  }
  console.log("After:");
  console.log(ndfa);
  console.log(dfa);
  return [dfa,ndfa];
}

function alphabates(post)
{
  let l = post.length;
  let z = 0;
  let zigma = [];
  for(let i=0;i<l;i++)
  {
    let match = 0;
    if(!(post[i]=='.'||post[i]=='+'||post[i]=='*'||post[i]=='|'||post[i]=='('||post[i]==')'||post[i]=='-'))
    {
      for(let j=0;j<z;j++)
        if(zigma[j] == post[i])
        {
          match = 1;
          break;
        }
      if(match==0)
        zigma[z++] = post[i];
    }
  }
  return zigma;
}

function operation()
{
  let infix = document.getElementById("data").value;
  let he = new head();
  let post = convert(infix);
  zigma = alphabates(post);
  he = draw(post,he);
  display(he);
  let states = doNumbering(he);
  let dfa;
  let ndfa
  let final_states;
  console.log("No. of states is:",states);
  [dfa,ndfa,final_states] = makeTable(he,zigma,states);
  console.log("ndfa is :");
  console.log(ndfa);
  [dfa,ndfa] = minimize(dfa,ndfa,final_states);
  console.log("DFA is ");
  console.log(dfa);

  let table = document.getElementById("myTable");

  let row = table.insertRow(0);
  let cell = row.insertCell(0);
  cell.innerHTML = 'Q / zigma';
  for(let i=0;i<zigma.length;i++)
  {
    let cell = row.insertCell(i+1);
    cell.innerHTML = zigma[i];
  }
//  document.write("Dfa length is",dfa.length);
  for(let i = 0 ;i<dfa.length;i++)
  {
    let row = table.insertRow(i+1);
    for(let j=0;j<dfa[0].length;j++)
    {
      let cell = row.insertCell(j);
      if((j==0)&&final_states.includes(dfa[i][j]))
        cell.innerHTML = '*'+dfa[i][j];
      else
        cell.innerHTML = dfa[i][j];
    }

  }
  createGraph(ndfa,dfa,zigma,final_states);
}


function createGraph(ndfa,dfa,zigma,final_states)
{
  for(let i=0;i<ndfa.length;i++)
    for(let j=0;j<ndfa[0].length;j++)
      if(ndfa[i][j] == -1)
        ndfa[i][j] = ndfa.length;

  let pathBone = convertNdfa(ndfa,dfa,zigma);
  let diag = document.getElementById("diag");
  let svgDFA = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  diag.appendChild(svgDFA);

  let g = [];
  let n = ndfa.length;

  let height = diag.offsetHeight;
  let width = diag.offsetWidth;

  for(let i=0;i<n;i++)
  {
    let cx = (i+1)*width/(n+1);
    let cy = width/4;
    let r;

    if(final_states.includes(dfa[i][0]))
    {
      r = Math.min(width/((n+1)*10),40);
      createCircle(g,i,cx,cy,r,"",svgDFA);
    }
    r = Math.min(width/((n+1)*8),50);
    createCircle(g,i,cx,cy,r,dfa[i][0],svgDFA);
  }

  let cx = width/2;
  let cy = width/2;
  let r = Math.min(width/((n+1)*8),50);
  createCircle(g,n,cx,cy,r,'#',svgDFA);
  svgDFA.appendChild(arrow(Math.min((width/30),10)));

  for(let i=0;i<pathBone.length;i++)
  {
    let keys = Object.keys(pathBone[i]);
    let values = Object.values(pathBone[i]);
    for(let j=0;j<keys.length;j++)
    {
      console.log("i is :",i,"  key is :",keys[j]);
      if(i==parseInt(keys[j]))
        [path,text] = connect(g,i,keys[j],-80,values[j]);
      else
        [path,text] = connect(g,i,keys[j],-50,values[j]);
      g[i].appendChild(path);
      g[i].appendChild(text);
      svgDFA.appendChild(g[i]);
    }
  }
}

function index(dfa,ele)
{
  for(let i=0;i<dfa.length;i++)
    if(dfa[i][0]==ele)
      return i;
  return dfa.length;
}

function convertNdfa(ndfa,dfa,zigma)
{
  let pathBone = [];
  for(let i=0;i<dfa.length;i++)
  {
    pathBone[i] = new Object();
    for(let j=1;j<dfa[0].length;j++)
    {
      if(pathBone[i][index(dfa,dfa[i][j])]==undefined)
        pathBone[i][index(dfa,dfa[i][j])]=zigma[j-1];
      else
        pathBone[i][index(dfa,dfa[i][j])]+=(","+zigma[j-1]);
    }
  }
  console.log(pathBone);
  return pathBone;
}

function createCircle(g,i,cx,cy,r,circleName,svgDFA)
{
  g[i] = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g[i].circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  g[i].setAttribute("id",i);

  g[i].circle.setAttribute("cx",cx);
  g[i].circle.setAttribute("cy",cy);
  g[i].circle.setAttribute("r",r);

  let data = document.createElementNS("http://www.w3.org/2000/svg", "text");
  data.setAttribute("x",cx);
  data.setAttribute("y",cy+r/4);
  data.setAttribute("font-size",r);
  data.setAttribute("text-anchor","middle");

  let node = document.createTextNode(circleName.toUpperCase());

  data.appendChild(node);
  g[i].appendChild(g[i].circle);
  g[i].appendChild(data);
  svgDFA.appendChild(g[i]);
}


function arrow(arrow_size)
{
  let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  let marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");

  marker.setAttribute("id","arrow");
  marker.setAttribute("markerWidth",arrow_size);
  marker.setAttribute("markerHeight",arrow_size);
  marker.setAttribute("refX","0");
  marker.setAttribute("refY","3");
  marker.setAttribute("orient","auto");
  marker.setAttribute("markerUnits","strokeWidth");

  let path =  document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d","M0,0 L0,6 L"+arrow_size+",3 z");
  marker.appendChild(path);
  defs.appendChild(marker);
  return defs;
}

function connect(g,first,second,degrees,textContent)
{
  let circle1=g[first].circle;
  let circle2=g[second].circle;

  let angle = degrees*Math.PI/180;
  let r = circle1.r.baseVal.value;
  let x2 = circle2.cx.animVal.value;
  let x1 = circle1.cx.animVal.value;

  if(x1<x2)
  {
    x1+=r*Math.cos(angle);
    x2-=r*Math.cos(angle)+10;
  }
  else
  {
    angle=-angle;
    x1-=r*Math.cos(angle);
    x2+=r*Math.cos(angle)+10;
  }

  let y2 = circle2.cy.animVal.value+r*Math.sin(angle);
  let y1 = circle1.cy.animVal.value+r*Math.sin(angle);

  let middleWidth,middleHeight;
  if(first<second)
  {
    middleWidth = Math.abs(x2-x1)/2+x1;
    middleHeight = (middleWidth-x1)*Math.tan(angle)+y1;
  }
  else
  {
    middleWidth = Math.abs(x2-x1)/2+x2;
    middleHeight = (middleWidth-x2)*Math.tan(angle)+y1;
  }
/*
  let textWidth = middleWidth;
  let textHeight;
  if(x1<x2)
    textHeight = (middleWidth-x1)*Math.tan(angle)/2+y1+10;
  else
    textHeight = (middleWidth-x2)*Math.tan(angle)/2+y1+10;
*/
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  let com =  "M "+x1+" "+y1+" "+" Q "+middleWidth+" "+middleHeight+" "+x2+" "+y2;

  path.setAttribute("d",com);
  path.setAttribute("stroke","black");
  path.setAttribute("fill","none");
  path.setAttribute("marker-end","url(#arrow)");
  let mypath = Math.random().toString();
  path.setAttribute("id",mypath);
  text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-size",r);
  text.setAttribute("text-anchor","middle");

  textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
  textPath.setAttribute("href","#"+mypath);
  textPath.setAttribute("startOffset","50%");

  let node = document.createTextNode(textContent);
  textPath.appendChild(node);
  text.appendChild(textPath);
  return [path,text];
}
