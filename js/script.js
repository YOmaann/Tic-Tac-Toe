var gridd=[null,null,null,null,null,null,null,null,null];
function checkwin(i)
{
    for(j=0;j<3;j++)
    if((i[0+j]==i[3+j])&&(i[3+j]==i[6+j])&&i[0+j]!=null)
        return [true,i[0+j],[0+j,3+j,6+j]];
    for(j=0;j<3;j++)
        if((i[0+j*3]==i[1+j*3])&&(i[1+j*3]==i[2+j*3])&&i[0+j*3]!=null)
            return [true,i[0+j*3],[0+j*3,1+j*3,2+j*3]];
    for(j=0;j<2;j++)
        if((i[0+2*j]==i[4])&&(i[4]==i[8-j*2])&&i[0+j*2]!=null)
            return [true,i[0+2*j],[0+2*j,4,8-j*2]];
    var f=0;
    for(i=0;i<9;i++)
    if(gridd[i]==null)
        f++;
    if(f==0)
     return [true,-1];
    return [false];
}
function update(i)
{
    gridd[i]=choice();
    if(checkwin(gridd)[0]==true)
        {
            results(checkwin(gridd));
        }
}
function results(res)
{
    if(!ui.disabled)disable();
            ui.end=true;
    if(res[1]!=-1){
        var e=document.getElementsByTagName("td");
        ui.g=res[2];
    for(i=0;i<3;i++)
        {
        e[res[2][i]].classList.remove("add");
        e[res[2][i]].classList.add("won");
        }
    document.getElementById("won").classList.remove("hide");
    }
    var an=(res[1]=="X")?"SORRY! COMPUTER WON...":(res[1]=="O")?"CONGO! U WON.......":"IT WAS A TIE....";
    ui.status="<b>"+an+"</b>";
    supdate();
    document.getElementById("won-b").classList.remove("hide");  
}
var moves=0;
function move(b,player,id,n)
{
    var score=checkwin(b);
    var i=0;
    var val;
    var bst=-100000000000;
if(score[0])
       moves+=(score[1]=="X")?10+n:(score[1]=="O")?-10-n:0;
 for(i=0;i<9;i++)
     {
         var st=0;
         if(b[i]==null)
             {
                 b[i]=player;
                 n+=10;
                 move(Object.assign({},b),(player=="X")?"O":"X",Math.random,n);
                 if(id==12){
                     console.log(i+"=>"+moves);
                 if(moves>bst){bst=moves;val=i;}
                 moves=0;
                 }
                 b[i]=null;
             }
     }
    return val;
}
function machine()
{
    if(!ui.end){
    disable();
    var res=move(Object.assign({},gridd),"X",12,0);
    ui.sct=document.getElementsByTagName("td")[res];
    setTimeout(done,Math.random(Math.random() *3));
    }
}
function done()
{
    up();
    disable();
    ui.chance++;
    if(!ui.end)
    pstatus();
    supdate();
}