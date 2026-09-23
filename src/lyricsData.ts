// Lyrics for the released catalog — sourced from Joseph Calitoy's own lyric sheets
// (cleaned Suno exports and his Apple Notes). Songs still being collected keep
// lyrics: null; purely instrumental releases are flagged `instrumental`.
export interface LyricSong {
  title: string;
  slug: string;
  soundcloud: string;
  lyrics: string | null;
  instrumental?: boolean;
}
export interface LyricAlbum {
  title: string;
  songs: LyricSong[];
}

export const lyricAlbums: LyricAlbum[] = [
  {
    title: `XCalitoy`,
    songs: [
      {
        title: `Lioness`,
        slug: `lioness-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/lioness-mp3`,
        lyrics: `You were the map that I never had
If there's a void in a crowded room
I learned to find happiness for two
By first finding it for one

All of a sudden, I learned to laugh without a crutch
Go to the quiet room of steady bones so I could bring you touch

When night pulls in, it's like a tide
And I try to take the sway
And juggle the  with the  like doors that never fray

They'd thank me for the warmth I gave for reading by the tent
A jungle concert  named my mom and she peace
And then I walk through market streets and courts
Each place in crooked slum
If it corner held a future where our life might belong

But my suitcase holds your essence like a metal edge in rust
Travel,  me how to hold on
Travel,  me how to trust

Fly in this, take my hand, the world is wide and wild
Our bodies far apart, our souls are praying, it's off the pile

Every new town writes a promise in the sand
But I am coming home, do you lie in this?
Understand, I am this

I am this, hold the door inside your eye
Let you recall them all
A  is key to pocket then

Mexico keeps me, took you in the east, I go to kin
You grow like fire in the quiet places
You chose to stand
I see your colors, made of patience
They're folded into plans

You taught me how to anchor
Even when I'm set to roll
You see that every shifting road
Might still be back to home

I  whether it changes, other sudden bends
But hope is stitched into the hands of every  that I send
Wrapped a smile and it'll keep them happening
I'm proud of you lying, it's your smile, it's like old oak

You move the  like sunlight, leave names and smoke
I'm a  in the ways that love is not a threat of vow
I sharpened up my edges till I'm ready to vow

I'm not asking for a temple nor a vow in
Just tell me where I fit, I can't keep being alone

Every city paints a  life across my window pane
Exist nights were Santa Claus came and tried to numb the train

I wonder how it faces, I'm  in the kin
But every passport stamp just folds me back to
I'm asking for a promise, not a seat upon your shore
I need to be the answer, not a maybe anymore

Time's sand runs in both hands, the clock's not on our side
So lie in this, be certain, let me enter, let me die try

You are the map in more than light and light

You grow like fire in the quiet places, you chose to stand
I see your pillars, made of patience, paint, we're folded in a plan

She taught me how to make her dream loud
So I try to roam to see that every shaking road
Might still be back to home

I'll ride the , it changes
On the sun, fans, my home is stitched into the hands
Of every letter that I send

I'll press and fire this, keep the map beneath your wrist

You are more than that and more than mine and mine
You are more than that and more than mine and miles

And by the miles

You are more than mine
You are more than mine
You are more than mine`,
      },
      {
        title: `Kill Me Now`,
        slug: `kill-me-now`,
        soundcloud: `https://soundcloud.com/calitoy/kill-me-now`,
        lyrics: `Kill me now before I go home
'Cause I don't wanna die alone
The silence knows my every name
Every hallway feels the same
I'm tired of outrunnin' ghosts
That somehow always get there first

Can I come over tonight?
Can you
Like always
Start a fight?
Anything to drown the noise
Anything but my own voice

Kill me now
Before the darkness learns my name
Before it tells me I'm the same
As every fear I've tried to hide
Every tear I've locked inside
I show up shakin' just to survive
With anxiety
I arrive
Long before I ever thrive
Kill me now

Every text I never send
Every road that doesn't end
I'm laughin' so they don't suspect
The war I carry in my chest
You say tomorrow's worth the wait
But tomorrow always comes too late

Can I come over tonight?
Leave the TV on all night?
I don't need the perfect words
Just proof that I can still be heard

Maybe I don't wanna disappear
Maybe I just don't want this pain here
Maybe underneath the scars
There's still a heart reachin' through the dark
If you see me losin' ground
Don't let the silence be the loudest sound`,
      },
      {
        title: `Show Must Go On`,
        slug: `show-must-go-on`,
        soundcloud: `https://soundcloud.com/calitoy/show-must-go-on`,
        lyrics: `So so loaded
She's so loaded, loaded, loaded
And Mr. Sunshine Kitty
Sunshine puss
Sunshine puss

I know that you love me but you don't know how to
I know that you're wild and amazing but you ain't there yet
I don't know, I don't know, I don't know
I ain't happy for you
Get a place with a guy for a guy
Get a place with a girl for a girl
In theory, basically, basically
I'm not going crazy
It's a bummer, a bummer you know
A bummer
Losing my shit all the time is what happens you know
Show must go on

She's so loaded
Loaded, loaded
She's so loaded, loaded, loaded, loaded
Mr. Sunshine Kitty
Sunshine puss
Sunshine puss
Oh, sunshine puss

I been on the edge, but I'm cool with the flame
Crowd keep screaming like they know my name
Too much pressure, but I move with the groove
If the world wanna watch, then I got somethin' to prove
She too bright, yeah, she shine like gold
Walk in the room and the temperature fold
I don't fold, I don't break, I don't fake that grin
When the lights go down, we just do it again
Backstage buzz, yeah, the whole room alive
Everybody want a piece, but I came to survive
Heart on my sleeve, but my style stay clean
Keep it all moving like a movie on screen
Now the stakes get high, but I climb that hill
Heavy on my chest, but I ride that thrill
If they want a show, then I bring that spark
Make a whole night glow when I step in the dark
Hands in the air, let the whole place shake
I don't miss my cue, I don't crack, I don't break
When the beat drops low, I'm a force, I'm a storm
Tell 'em one more time, the show must perform

Show must go on, go on, go on
When the night gets long, we go strong
Show must go on, go on, go on
Keep it loud, keep it wild, keep it on
Show must go on, go on, go on
No matter what it takes, we hold on
Show must go on, go on, go on
Till the lights come up and the fear is gone

Get a place with a guy for a guy
Get a place with a girl for a girl
In theory, basically, basically
I'm not going crazy
It's a bummer, a bummer you know
A bummer
Losing my shit all the time is what happens you know
Show must go on
Show must go on
Show must go on`,
      },
      {
        title: `The Real Reason`,
        slug: `the-real-reason`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `I thought that it would be down here for me
You lost all you got but I still have my feet
Sit by the window there, raindrops match my tears
Asking myself what's the reason that I'm here (that I'm here)
See you have a purpose, don't worry, it's just not time
I know you're hurting but life's so uncertain, there's no choice but to enjoy the ride
See the waves will crash eventually, pull me right back out to sea
Don't wait for the next swell to bring me in

I'm just swimming, oh I'm swimming
No I'm not giving up
And I'm not down, best believe I'm getting up
While I'm winning, best believe I'm winning
It's my life so I'ma live it how I want 'cause I've had enough
So put your fists up
My brothers and sisters, twist up
If you got your herb, why we lift up our soul to the sky
You, I, and I, let them know we'd defy
We keep fighting, keep fighting

Yeah, I used to feel like I'm sinking and all of this thinking might be a surprise
But you're made of light and we're just drinking so shine bright, we're on the brink of evolution
All I see in my foresight is revolution
And we don't give a  what they think and you can take that to the bank
Hold up, what you drink or smoke as we toast
To never walk in the blank, to all the lost souls that call the world their own
Know that you're not alone
Don't be afraid to rise up into the atmosphere, skating on the stars so high and we enter the realm where only good vibes collide with low tides
And allow the skies to clear, so just smile

Put your fists up
My brothers and sisters, twist up
If you got your herb, why we lift up our soul to the sky
You, I, and I, let them know we'd defy
We keep fighting, keep fighting
We keep fighting, keep fighting

Da-da-da-da-da-da-da
Keep on, keep on fighting for my people
Put your fists up
My brothers and sisters, twist up
If you got your herb, why we lift up our soul to the sky
You, I, and I, let them know we'd defy
We keep fighting, keep fighting
We keep fighting, keep fighting`,
      },
      {
        title: `Stole From`,
        slug: `stole-from`,
        soundcloud: `https://soundcloud.com/calitoy/stole-from`,
        lyrics: `Stole from...

The first time I was stole from I was unborn
God hit my mom's mind so I was born old
My alcohol addiction started newborn
I drank gin before most of you wore clothes
I am not energetic when I drink (drink, drink)
I can run a marathon and write a poem while you think
My IQ is leagues past you, my EQ genius level angry though
because I'm sick of getting beaten down, dragged down
Thoughtless about people nowhere close to me
I was robbed as a child and then it made me
I was beaten as a child and then I made myself
I didn't come from wealth, I made it myself
I made more millionaires than most of you made friends
If people listened to me they'd be in a better place
mentally and physically
This is not a parody, this is just me
I told you what to build, what to buy, what could have changed your reality
But I'm not interested in money
So bow and find what that really means

You think fortune brings fortune
And I've seen the future, you're better warring
Strength is all that will matter
And all you do is get fatter
Life is killing you, you didn't put God in you
You lost your mind and to be kind you're fucked
I think about what you'll do next
That's why I know what happens after we connect
I haven't just been robbed once
I had problems with a bunch
They steal the only thing I don't value
To attack me buy you can't hurt me
I don't even care for me to a new degree
I don't even want to be

Stole from me and you will be cursed
No good life here let alone above
I am as godly as they come
I am many, not just one
I can't go anywhere without being stalked
By weak people thinking we should talk
I'm sick of all you infant souls
Stop looking at me with demon-minded coils
You are nothing, you will be nothing
And it's not my fault
Blame someone else, blame yourself and go some place else

I tried to disappear, you all reappear
Doing what I do
It's more annoying than you can imagine
Because when I need you, you aren't there
Not all of you, some great ones care
My childhood friends still love me
I love my family and friends harder than strangers beside me
But if one shines, maybe he stands beside me at the end of night
I give chances to those that shine

Don't fuck with me, I stare back with ferocity
People destroy themselves trying to test me
Then disappear and the room breathes easier after
Close-minded is what they call it when they try to force my face to the ground
What they hide is the walls behind me already won war
And I'm the one holding them back
Intelligent, violent men get respect from the ones behind them
Disrespect one if you want, that's up to you
You will be through
I partially retired at twenty-two
Now I'm back, so fuck off
I'm here to show you my twenty-three at thirty-eight
Because I took fifteen years off
I traveled the world, made other people rich without return
But nobody cares, I won't make you believe me
Until I show you the worst of myself

Monsters get called angels every day
And people still worship them
Fuck with me, you fuck with my friends
Made men and Gangsters doing what I say
Because being me is hard to be
And none of them want that responsibility
To move through rooms without saying anything
And still never get told no
So steal from me, you steal from yourself, Stole from`,
      },
      {
        title: `Mug on the Shelf`,
        slug: `mug-on-the-shelf`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: null,
      },
      {
        title: `Home From Your Shadows`,
        slug: `home-from-your-shadows`,
        soundcloud: `https://soundcloud.com/calitoy/home-from-your-shadows`,
        lyrics: `Step away from the abuse
I always thought I was easy
But nothing about this is easy
When neglect settles in your bones
And silence becomes a language you know too well

It hurts
God, it hurts

You miss them when you shouldn’t
You do though, even when you couldn’t
Even when every warning sign was written on the walls
Even when your heart was dragged through broken halls

Feeling alone, loneliness deepens
Something you don’t understand just happens
The days get longer, the nights grow loud
And every memory gathers like a storm cloud

You look outward for relief
But you carry this abused belief
That a better human exists
Where you couldn’t find one before

That something different will happen this time around
That’s for sure

But those who apologize and never change
Those who promise sunshine while delivering rain
They’re a frightening reality
A brutal worry

Of destructive self-loathing becoming a normality

No matter how far I pull away
You still love them and care
A part of you still waits
Believing they’re still there

And I hate that I miss you
When missing you hurts me most
I built a home from your shadows
And lived with your ghost

You took pieces I never got back
Left echoes inside my head
Now every road I travel
Leads through words we never said

But love doesn’t disappear
Just because it wasn’t fair

I replay conversations
Trying to find where it broke
Searching through every sentence
For a meaning you never spoke

I carried your burdens
Like they were mine to hold
While you carried excuses
Wrapped in silver and gold

I thought patience was healing
I thought sacrifice was strength
But I stretched myself so thin
Trying to go any length

To save something that never wanted saving
To water flowers already fading

And every time I left
Part of me turned around
Listening for footsteps
That never made a sound

And I hate that I miss you
When missing you hurts me most
I built a home from your shadows
And lived with your ghost

You took pieces I never got back
Left echoes inside my head
Now every road I travel
Leads through words we never said

But love doesn’t disappear
Just because it wasn’t fair

Maybe healing isn’t forgetting
Maybe it’s learning not to bleed

Maybe closure isn’t answers
Maybe it’s giving yourself what you need

Maybe the person I’ve been searching for
Was never waiting behind another door

Maybe they’re here
Learning to stand
Learning to trust
Learning to understand

And I still miss you sometimes
Though I know why I had to leave
The heart takes longer than the mind
To accept what it believes

But every scar becomes a story
Every wound can become light
And though I walk through lonely valleys
I’m still walking toward my life

No matter how far I pull away
The memories remain

But they don’t own me anymore

I believe you’re still there

But I’m finally finding me.`,
      },
      {
        title: `Not You`,
        slug: `not-you`,
        soundcloud: `https://soundcloud.com/calitoy/not-you`,
        lyrics: `I don't want to write another song about you
I love you, so fuck a song
I don't want to write about you anymore
So let's be clear
No one wants to hear another song about my love for you
No one wants to hear another word about you

So this fucking rap is not about you
It's at you, it's fucking at you
And nothing in it is about you
You a toy for those that drink from fountains that drought you
This rap ain't about you
Nine Inch Nails is  band and ain't fucking looking static
Nine miles dry and complaining and not a grout for you
My kid carried rap, healed blinders speaking
Orange Ninja Turtle martial arts artistic, let me slam flat
Around and salute about face to you
Flags are flags and you ain't one but take this to mean I still love you
I act like an angel and fly above you
I'm a damn peaceful dove above for you
Make a child smack themselves rather than ass beating for you

I love you
I don't want to write another song about you
I love you
So fuck a song I don't want to write about you anymore
So let's be clear
No one wants to hear another song about my love for you
No one wants to hear another word about you
I love you

I love you
I love you
I love you
I love you`,
      },
      {
        title: `Two shirts`,
        slug: `two-shirts`,
        soundcloud: `https://soundcloud.com/calitoy/two-shirts`,
        lyrics: null,
      },
      {
        title: `Still Here`,
        slug: `still-here`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `Step away from the abuse
I always thought I was easy
But nothing about this is easy
When neglect settles in your bones
And silence becomes a language you know too well

It hurts
God, it hurts

You miss them when you shouldn’t
You do though, even when you couldn’t
Even when every warning sign was written on the walls
Even when your heart was dragged through broken halls

Feeling alone, loneliness deepens
Something you don’t understand just happens
The days get longer, the nights grow loud
And every memory gathers like a storm cloud

You look outward for relief
But you carry this abused belief
That a better human exists
Where you couldn’t find one before

That something different will happen this time around
That’s for sure

But those who apologize and never change
Those who promise sunshine while delivering rain
They’re a frightening reality
A brutal worry

Of destructive self-loathing becoming a normality

No matter how far I pull away
You still love them and care
A part of you still waits
Believing they’re still there

And I hate that I miss you
When missing you hurts me most
I built a home from your shadows
And lived with your ghost

You took pieces I never got back
Left echoes inside my head
Now every road I travel
Leads through words we never said

But love doesn’t disappear
Just because it wasn’t fair

I replay conversations
Trying to find where it broke
Searching through every sentence
For a meaning you never spoke

I carried your burdens
Like they were mine to hold
While you carried excuses
Wrapped in silver and gold

I thought patience was healing
I thought sacrifice was strength
But I stretched myself so thin
Trying to go any length

To save something that never wanted saving
To water flowers already fading

And every time I left
Part of me turned around
Listening for footsteps
That never made a sound

And I hate that I miss you
When missing you hurts me most
I built a home from your shadows
And lived with your ghost

You took pieces I never got back
Left echoes inside my head
Now every road I travel
Leads through words we never said

But love doesn’t disappear
Just because it wasn’t fair

Maybe healing isn’t forgetting
Maybe it’s learning not to bleed

Maybe closure isn’t answers
Maybe it’s giving yourself what you need

Maybe the person I’ve been searching for
Was never waiting behind another door

Maybe they’re here
Learning to stand
Learning to trust
Learning to understand

And I still miss you sometimes
Though I know why I had to leave
The heart takes longer than the mind
To accept what it believes

But every scar becomes a story
Every wound can become light
And though I walk through lonely valleys
I’m still walking toward my life

No matter how far I pull away
The memories remain

But they don’t own me anymore

I believe you’re still there

But I’m finally finding me.`,
      },
      {
        title: `Lost Dog`,
        slug: `lost-dog`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `Here’s to a dog gone dead
Here’s to a life to celebrate
Here’s to a as knowing
When somebody hone

Here’s to a baby gone
Well, we wish we had immunity
But sad as it seems
We find ourselves impunity

Mind one moment
And a second choke it
Brother pass
Even fur indeed

Here’s to a dog gone dead
Here’s to a dog gone dead
We lift it up and let it bleed
We hold the hurt and let it breathe

Here’s to a baby gone
Here’s to a baby gone
What’s left of us still carries on
What’s left of us still carries on

Mind one moment in my hand
Then it slips like sand through teeth
I laugh too hard, I bite it back
I keep my face where sorrow meets

Brother, pass that cup again
Let the room go soft and slow
Even fur indeed can fade
Even bones learn how to go

Mind one moment
And a second choke it
Brother pass
Even fur indeed

Here’s to a dog gone dead
Here’s to a dog gone dead
We lift it up and let it bleed
We hold the hurt and let it breathe

Here’s to a baby gone
Here’s to a baby gone
What’s left of us still carries on
What’s left of us still carries on

If I sound like I’m breaking
I am
If I smile through the shaking
I can

One moment
Then the next
We bless the wreck
We bless the wreck

Here’s to a dog gone dead
Here’s to a dog gone dead
We lift it up and let it bleed
We hold the hurt and let it breathe

Here’s to a baby gone
Here’s to a baby gone
What’s left of us still carries on
What’s left of us still carries on`,
      },
      {
        title: `I Here`,
        slug: `i-here`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `Yeah! Yeah! Yeah!

I am Joseph, I am Joseph Anthony
I am Joseph I am Joseph Calatoy,
I am Title Crash, I am ST
I am 727, I am the Joemad and I
I lead a legion of humans who care
I'm only me when I'm down here
Homelessness ain't a debate piece but you clutch your purse
Throwing glances like loose change like you just rehearsed
Your scared, we all are
Space is a necessity but is it the recipe to untangle this mess of a system we breathe
You like dogs near you but not a man in a shack next door
Me as a man somewhere in between
I walk both to take ten steps back, let the dog walk free
You fight over land, over color, over claims to a sea
While I sit down, a mutt licking my face thinking he's got more kindness than the hands that feed
I take him in, but you can afford to feed him more than I can
And more than the man in the shack, right?
Take your title, take your steps, step down, step back, let go of the flex

Turn your lights on, keep your mind clear
Crime is crime, no matter the shade
Turn the noise down, turn the rage down
If I have to spell it out you've already lost your way

A woman walks by at midnight
Jewels catching streetlights, flight in her step, fear in her breath
Do the right thing, make sure next time your presence, not a shadow she fights
No one race holds all the blame
No one people built all the pain
But history's ghosts keep walking in chains
And we're still out here screaming for change
So stop talking if you ain't listening
Stop spinning words if they ain't lifting
Yeah, and if I can hear your car from a mile away
Know that someone's always watching
Not with a weapon but with eyes that see
Once you're my family, I'll fight for you like blood
'Cause that's what real care should be

So stop talking if you ain't listening
Stop spinning words if they ain't lifting
And if I can hear your car from a mile away
Know that someone's always watching
Not with a weapon but with eyes that see
Once you're my family, I'll fight for you like blood
Because that's what real care should be`,
      },
      {
        title: `Wild`,
        slug: `wild`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `erse 1
She walks in like the room exhales
Feet on the floor, but she bends the rails
She feels it all, yeah she lets it sting
But she don’t spill her heart on just anything

She’s not chasing mirrors, not begging light
She moves slow, like she knows the night
There’s a stillness in the way she stands
Like she already holds what they demand

Pre-Chorus
She don’t burn just to feel alive
She don’t break just to prove she’s fire
Every look got a quiet edge
Every word lands where it’s meant

Chorus
She can be such a baddie
Such a beautiful bombshell flame
But she don’t fall apart for desire
She don’t confuse love with pain

She’s magnetic without the madness
She’s dangerous calm, not wrecked
Yeah, She’s whole, not wild
That’s why she hits your chest

Verse 2
She don’t perform, she don’t overplay
No tragic scenes just to make you stay
Her sensuality breathes, it don’t shout
She knows when to pull you in, when to shut it down

Boundaries drawn like poetry
Soft lines, but they’re iron to me
She opens slow, she closes clean
That’s how she keeps her power unseen

Pre-Chorus 2
She’s got depth like a low tide pull
You feel her truth before the rule
No chaos dressed up as desire
No smoke where there ain’t no fire

Chorus
She can be such a baddie
Such a beautiful bombshell flame
But she don’t fall apart for desire
She don’t confuse love with pain

She’s magnetic without the madness
She’s dangerous calm, not wrecked
Yeah, She’s whole, not wild
That’s why she hits your chest

Bridge
She’s been wild, yeah she knows that road
Where drama dresses up like hope
But she learned the cost of losing shape
Now her power lives in restraint

She laughs loud, she moves free
Got that playful spark, that honesty
A little wild, yeah maybe so
But never lost, never broke

Breakdown
She don’t need dysfunction to feel desired
She don’t light herself just to call it fire
What you feel when she looks your way
Is integration, not decay

Final Chorus
She can be such a baddie
Such a once-in-a-room kind of pull
Not an emotional wreck for attention
She’s dangerous cause she’s full

She’s magnetism without the chaos
She’s fire that learned control
Yeah, She’s a baddie, a bombshell
Cause she’s whole

Outro
Not wild
Not wrecked
Just real
And that’s what makes her unforgettable`,
      },
      {
        title: `Hither`,
        slug: `hither`,
        soundcloud: `https://soundcloud.com/calitoy`,
        lyrics: `I cross half the town for you
Lace my shoes for you
Wait by the curb in the rain
Like it’s nothing, like it’s plain

You answer late, short and cold
Act like I’ll never fold
Like I’m a lock on your door
Always there, wanting more

But I’m tired of the wait
Tired of the “maybe” weight
Got a line at my phone
And you still leave me alone

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
While I’m halfway there

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
While I’m halfway there

And everywhere I step
Somebody’s reaching out
Names I don’t even know
Still they all want in my crowd

Pretty face, clean smile
Says she can stay a while
But I still pick up your call
Even after you let me fall

Now I see the switch
You think I’m stuck in this
But I’m not your sure thing
I’m a yes with a sting

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
While I’m halfway there

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
While I’m halfway there

If I step back, don’t blink
That door won’t stay on the hinge
I’ve been patient, I’ve been kind
But I won’t wait my whole damn life

So choose me now or lose me clean
I’m not some maybe in between
I got a world that wants my time
And I’m done begging for a sign

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
While I’m halfway there

Don’t take me for granted
I’m not planted
I’m not always there
Don’t take me for granted
You keep me stranded
I’m halfway there

(halfway there)
(halfway there)`,
      },
      {
        title: `inflicted`,
        slug: `inflicted`,
        soundcloud: `https://soundcloud.com/calitoy/inflicted`,
        lyrics: `Blood on my cuff, not from a fight
Just from the way I hold the night
I seen the good get bent too far
By hands that smile and hide their scars

Say grace, then step on it
Say love, then test my split
I’ve got a pulse and a warning sign
I keep my faith with a crooked spine`,
      },
    ],
  },
  {
    title: `CaliTOY`,
    songs: [
      {
        title: `All The Love`,
        slug: `allthelove`,
        soundcloud: `https://soundcloud.com/calitoy/allthelove`,
        lyrics: null,
      },
      {
        title: `Colors`,
        slug: `colors`,
        soundcloud: `https://soundcloud.com/calitoy/colors`,
        lyrics: `Colors / Sammy
I want to see the colors you have
I want to spread them all inside
I want to hold you my butterfly
Not too tight, I also need to fly
Carry on and make yourself
Love me but dont need no help
Colorful in every way
Smiles back from miles away
I want the colors you have
I want to bathe you,
 a bubble bath
Wont wreck your rings I know
Because this boy and girl are on the go
I want the colors you have
Fifty five reasons I cant be mad
I want to spread inside out
I want to taste you in an out
Fire me up from the core down low
Ive got no time but to blow
I want to see the colors you have
I want to be so damn bad
I want to fight you
I want to hold you
I want to screw you
I want to hold you
I want to hold you down
I want to see the colors you have
I want to so damn bad
I want to know you in an out
I want to hear you fucking shout
I need to see the colors you have
I know I want you so damn bad
Flavors are man’s best friend
I’m gonna eat you til the end`,
      },
      {
        title: `It’s time for a better world`,
        slug: `its-time-for-a-better-world`,
        soundcloud: `https://soundcloud.com/calitoy/its-time-for-a-better-world`,
        lyrics: null,
      },
      {
        title: `Sculpin`,
        slug: `sculpin`,
        soundcloud: `https://soundcloud.com/calitoy/sculpin`,
        lyrics: null,
      },
      {
        title: `Terrified Jerkoff`,
        slug: `terrified-jerk-off`,
        soundcloud: `https://soundcloud.com/calitoy/terrified-jerk-off`,
        lyrics: `Terrified and anxious
Gonna find
Some purpose
Creating satisfaction
Relying on others
None

Paranoid and practiced
Depression reannacted
Passed or future
None matter
At
All

Freedom lacks meaning
When tears keep
Bleeding
From
Eyes

Reactions not serving
Friends keep blurring
Enemies keep hurting
Where are
You

Frequencies slurred
Carelessly heard
Forests are burning
Climates absurd

Why we lack meaning to us
Carelessly breathlessly we thrust
Forward we must
Why dont you trust
Me
to care

We lie bare
Why arent we there
Why have we cared
Its all but
Over`,
      },
    ],
  },
  {
    title: `Dance & Play`,
    songs: [
      {
        title: `Bleeden`,
        slug: `bleeden`,
        soundcloud: `https://soundcloud.com/calitoy/bleeden`,
        lyrics: null,
        instrumental: true,
      },
      {
        title: `Cheeden`,
        slug: `cheeden`,
        soundcloud: `https://soundcloud.com/calitoy/cheeden`,
        lyrics: null,
        instrumental: true,
      },
      {
        title: `Eden`,
        slug: `eden-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/eden-mp3`,
        lyrics: null,
        instrumental: true,
      },
      {
        title: `Subeden`,
        slug: `subeden`,
        soundcloud: `https://soundcloud.com/calitoy/subeden`,
        lyrics: null,
        instrumental: true,
      },
      {
        title: `Sweden`,
        slug: `sweden`,
        soundcloud: `https://soundcloud.com/calitoy/sweden`,
        lyrics: null,
        instrumental: true,
      },
    ],
  },
  {
    title: `Holy Trinity`,
    songs: [
      {
        title: `Mother Earth`,
        slug: `motherearth`,
        soundcloud: `https://soundcloud.com/calitoy/motherearth`,
        lyrics: `poEm Mother Earth
I can tell you
we’re here for love and not war
What else could this life be for
Were here for a brisk walk through a meadow on a summer day
A slow plunge into a chill lake in May
Smelling flowers all along the way
Were here for that First glance up at the moon at night
For the birds chirping every morning except during a wintry plight
Fresh herbs in a grandmothers soup
A wooden pyre set up at a high school
Were here for new babies brought to the world from a womb
For autumn where trees bare their fruit
Sunny days a plenty but
We welcome the rain
mother earth is here and this is her game.
You were all that others came to see
You made me
You brought urgency to a new degree
You did more than most
You did all that could have been done
Unappreciated
Not commiserative
Unrealized
And you were my grandmom
A child
So wild
How could anyone expect
How much neglect
That you went through
Over and over and over too
You raised three kids
And they love you
You are appreciated
We loved you
We love you
My grandma
Your mother
Our mother earth
Youre my heart and my passion
You always let me be me and never fassioned
Alternative views to change me
You always just let me be
Just let me be me
Youre my grandma and
Now you’re gone
But you alive
In this very song
You’re my grandma
And you’ll always be
You’re my grandma
And now you’re free..`,
      },
      {
        title: `Thank God`,
        slug: `thank-god`,
        soundcloud: `https://soundcloud.com/calitoy/thank-god`,
        lyrics: `The only thing Id chase is god
but Im never left so help me god

I love life and others
I love fairy tales
and stories
of mothers

I love life like it matters
even when it seems like it doesn't

I get sad when I lose someone but try my
best to hold their energy close to my heart

I just want to be a part
A part of you
A part of it
With God I am
With God We Are

Together
Together`,
      },
      {
        title: `Women Impactful`,
        slug: `womenimpactful`,
        soundcloud: `https://soundcloud.com/calitoy/womenimpactful`,
        lyrics: null,
      },
    ],
  },
  {
    title: `Paper Boy`,
    songs: [
      {
        title: `Disbelief`,
        slug: `disbelief`,
        soundcloud: `https://soundcloud.com/calitoy/disbelief`,
        lyrics: `Disbelief and doubt
Pages whisper secrets I can’t deny,
The future’s written, yet you call it a lie.
Every word cuts deeper, every doubt a chain,
I hold the proof, but you call it insane.
Disbelief in the shadows, doubt in the flame,
A power that beckons, but you mock its name.
Father, can’t you see what’s real?
The truth I hold, the fate I feel.
A car crash on Main, it played out the same,
Predictions unfold like a twisted game.
You turn away, blinded by fear,
While the echoes of tomorrow scream loud and clear.
Flickering flames in the fireplace glow,
Casting shadows of what you won’t know.
A legacy buried, a secret untamed,
I’ll bear this burden while you shift the blame.
Disbelief in the shadows, doubt in the flame,
A power that beckons, but you mock its name.
Father, can’t you see what’s real?
The truth I hold, the fate I feel.
The streets cry loud, the future’s near,
I’ll prove you wrong, erase your fear.
This curse, this gift, I’ll use it wise,
To protect the town under ominous skies.`,
      },
      {
        title: `First Paper`,
        slug: `first-paper`,
        soundcloud: `https://soundcloud.com/calitoy/first-paper`,
        lyrics: `Morning breaks, the air is cool,
Leaves are turning, autumn’s rule.
A newspaper clutched, mysteries untold,
The day ahead feels brave and bold.

Fate written in black and white,
Secrets hiding in plain sight.
Numbers match, the truth revealed,
A future printed, fate unsealed.

A car crash drawn in the afternoon,
The lottery’s fortune whispers its tune.
Skeptic thoughts, but the heart won’t lie,
A gift or curse from times gone by?

Grandfather’s shadow lingers near,
Echoes of purpose, sharp and clear.
What’s this power in my hand,
A mystery I must understand?

Fate written in black and white,
Secrets hiding in plain sight.
Numbers match, the truth revealed,
A future printed, fate unsealed.

Questions grow with every page,
The start of a journey, a story to stage.
I’ll keep this secret, for now, it’s mine,
A map of time, a path to find.`,
      },
      {
        title: `Memories`,
        slug: `memories`,
        soundcloud: `https://soundcloud.com/calitoy/memories`,
        lyrics: null,
      },
      {
        title: `Paper Boy`,
        slug: `paper-boy-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/paper-boy-mp3`,
        lyrics: null,
      },
      {
        title: `Willowbrook`,
        slug: `willowbrook`,
        soundcloud: `https://soundcloud.com/calitoy/willowbrook`,
        lyrics: null,
      },
    ],
  },
  {
    title: `Roses`,
    songs: [
      {
        title: `Ignore Me`,
        slug: `ignore-me`,
        soundcloud: `https://soundcloud.com/calitoy/ignore-me`,
        lyrics: `You can ignore me
but I am exactly who you need

You can ignore me
but I am exactly who you need

Don't keep faltering
Dont keep letting us
Letting us fall
Letting us fallll
Letting us fallll

You can ignore me
but you can't ignore what I say

You can ignore
it will happen any way

Dont fuck up here
Im only asking
Do you want to live in fear
Do you want to see the death of here
Do you want to be asking

Could I have saved us
Could I have saved us
Could I have saved us

The future is in your hands
and Im not laughing
you have been destructive
you have been reductive

Change is near
regardless
lets do it
without fear
￼`,
      },
      {
        title: `Love`,
        slug: `chels`,
        soundcloud: `https://soundcloud.com/calitoy/chels`,
        lyrics: null,
      },
      {
        title: `Misfits`,
        slug: `misfits-1`,
        soundcloud: `https://soundcloud.com/calitoy/misfits-1`,
        lyrics: null,
      },
      {
        title: `Not Bad`,
        slug: `not-bad`,
        soundcloud: `https://soundcloud.com/calitoy/not-bad`,
        lyrics: null,
      },
      {
        title: `Selena`,
        slug: `selena`,
        soundcloud: `https://soundcloud.com/calitoy/selena`,
        lyrics: null,
      },
    ],
  },
  {
    title: `That JoeMad`,
    songs: [
      {
        title: `Cancer`,
        slug: `cancer`,
        soundcloud: `https://soundcloud.com/calitoy/cancer`,
        lyrics: `Rap -Your

c
ancer
Youre cancer
Everyday you plan is something you cancel
Leaving people hanging cause youre selfish
What? Have a fit
You mad cause im talking truth
Cause you’re a liar, take a hit
Is it that you have to stay important
An errand, an avenue you used
Because its something that your used to
You lost because people only saw what meets the eye
Stocky she hot
Thick thighs
Cant lie
That where I traveled in my mind
Legs spread dick deep
Crushing v like T P
Disentegrating and making
Something happen
You be cumming while im rapping
Let me put my fist up
For a revolution
Rage is just personal pollution
Ive got a solution
Every problem comes with neglect
No respect to the possibilities we could errext
By grabbing a hold of the things we want to do that are bold
Dont do what youre told
Best chance you have is to die a little old
All going that wayl
Asking death for another day
One at a time
Each day, another to rhyme
Baby boomers end up dieing
Kinda sad
30 million mostly millennials seriously mad
And broke
Like a bad joke
Just find a solution
Not this noise polution
Something better than the hanging chad
How bad
Damn
How bad
Heading back to bombing iraq
While people in afghanistan
Are the ones
Who actually had the plan
To take it the man
The man being us
The US
Sending weapons over seas
To any company, individual, a person, whatever they might be
Giveth thee
A prayer from god
Sent down from the sky,
Ignored we
Took the wrong pill
Shit that fantanyl
Bye will
We armed all humans,
Now they kill,
one another
Scared we couldnt feed eachother
Problems with hunger
Not enough for all
Its a problem child
He didnt make that call
Made sisters and brothers
Fathers and mothers
Those who sin, sin, knowing
What they do is wrong
Some deadly affect most
There are more than seven
Just start with those, so
The angels can have less to deal with.
As they contemplate the chance your coming to heaven`,
      },
      {
        title: `End Much`,
        slug: `endmuch`,
        soundcloud: `https://soundcloud.com/calitoy/endmuch`,
        lyrics: null,
      },
      {
        title: `Fanty Bray`,
        slug: `fantybray`,
        soundcloud: `https://soundcloud.com/calitoy/fantybray`,
        lyrics: null,
      },
      {
        title: `Lucifer`,
        slug: `lucifer`,
        soundcloud: `https://soundcloud.com/calitoy/lucifer`,
        lyrics: null,
      },
      {
        title: `Not the best`,
        slug: `notthebest`,
        soundcloud: `https://soundcloud.com/calitoy/notthebest`,
        lyrics: null,
      },
    ],
  },
  {
    title: `Two Light`,
    songs: [
      {
        title: `A Loyal Dog`,
        slug: `a-loyal-dog`,
        soundcloud: `https://soundcloud.com/calitoy/a-loyal-dog`,
        lyrics: null,
      },
      {
        title: `Forced`,
        slug: `forced`,
        soundcloud: `https://soundcloud.com/calitoy/forced`,
        lyrics: `Forced entry - getting nervous
Ducking low - hid in the closet
Its dark in there so no one will find me
Stomps and screams, sounds of brutality
Tears seem to fall endlessly
Still trying to be silent
That IS what mother taught me.
In the past it wasnt as bad
Whats different this time
Why is daddy so mad?
I bet it is my fault
Cant stay and hide
Have to help mommy
Never forgive myself
Must take her side
Decisions made running and out of breath
Tears still falling, no plan in my head
Just plead with daddy, can take a hit or two
Mommys had enough - taking the beating will be easier too
Eyes shut I run at him
Daddy caught of guard
Mustve hit him hard
Loses balance - falls backward
Concrete floors have no give
Blood flowing -
Should of done what mommy said
"You promised me carpets when money isn't tight,
But thats not important as alcohol, right"
First time I saw mommy get hit
Daddy deserved it right but still I feel strange
Mommys now crying, so confused
"will be okay mommy"
Head shaking but definitely bruised
"go to room, everything will be alright"
Cant stop looking though motionless there just lieing, daddy is dead, what did I do.
He taught me how to swim, fish, how to aim in the bowl.
Daddy was half my life, stomach turns sick
But daddy used to hold my hand when I puke
Daddy cared so much for me
It was only a few nights that he'd get that way
If he got up what would he say
What he always told me
Every tomorrow will be a better day.`,
      },
      {
        title: `Haze`,
        slug: `haze`,
        soundcloud: `https://soundcloud.com/calitoy/haze`,
        lyrics: `I spent three days with my family
Its been a malaise for half a century
I was down south and some fun
Then I ran into someone
he took his life
he took his life
and Im broken
he took his life and since
Ive been broken
I cut myself walking every road
theres nothing I can show you
for you to know
the pain I feel
deep inside
theres no way to have pride
I miss you kyle
i miss you kyle
i miss you kyle
and its been a long while
I provided to look to god
I think I found something to remember
I think I found something to not remember
but I spent three days with my family
but its nothing but malaise for another half century

I think I found something to remember
I think I found something to not remember

I found something to remember
I found something to not remember`,
      },
      {
        title: `Paws in the sky`,
        slug: `paws-in-the-sky-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/paws-in-the-sky-mp3`,
        lyrics: null,
      },
      {
        title: `six`,
        slug: `six-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/six-mp3`,
        lyrics: `Wh
y im
 single
, w
ere
six
How does one fall in love with a single person? How hard is that experience?
But I’m six. Six of us have to fall for the same person for it to work and in return all of you needs to fall for all six.
This has never happened and I am not surprised. It’s inprobable to say it finely.
Do all of you operate independently? The answer there is no. 2 of us work together, two of us help in need, and one of two of us takes over in times of distress: im working on it.
Ketamine therap y has brought us all. Back together for periods of time. A way to mend the imbalance of pieces.
How do you know your suffering from MPD? Is this hard? Yes. Suffering I believe is an innapropriate term for what happens. Much of what I experience on a regular basis is what a binge drinker experiences by blacking out. Some people have a different name to whom they become. Thats MPD
Whats different about mine is that its always been there.`,
      },
    ],
  },
  {
    title: `Singles`,
    songs: [
      {
        title: `Always There`,
        slug: `always-there`,
        soundcloud: `https://soundcloud.com/calitoy/always-there`,
        lyrics: `Verse 1
I cross the city when your voice gets low
Drop what I’m doing just to be your ghost
You call me when the night gets cold
But when the sun comes up, I’m left alone

You keep me waiting like it’s something sweet
Like I don’t feel the distance in between
You got a talent for acting unaware
Like I’m a promise that’ll always be there

Pre-Chorus
And I’ve got options lighting up my phone
Names I don’t answer when I’m driving home
They’d give me everything you make me chase
But I still look for you in every face

Chorus
I’m getting impatient, baby
Tired of standing in your rain
You treat my love like it’s waiting
Like I won’t ever walk away

There’s a hundred hearts outside my door
Trying to give me what I’m asking for
But I go out my way for you
And you act like you've got nothing to lose

Verse 2
You say you miss me when I start to fade
Then disappear when I’m back in your place
It’s like you love me most when I’m halfway gone
But I’m not a shelf you can leave things on

I know you feel it when I pull away
You start to panic, then you call it fate
But I need more than a maybe tonight
I need your hands, not another sign

Pre-Chorus
And I’ve got eyes on me everywhere I go
They see the fire you keep trying to hold
But I’m not built to beg for what I give
I want a love that knows how to live

Chorus
I’m getting impatient, baby
Tired of standing in your rain
You treat my love like it’s waiting
Like I won’t ever walk away

There’s a hundred hearts outside my door
Trying to give me what I’m asking for
But I go out my way for you
And you act like I'm nothing to lose

Bridge
Don’t make me prove I can be wanted
Don’t make me show you I can leave
You know the world is at my window
But you’re the one I chose to see

I’m not asking for forever
I’m just asking you to care
Before the man who always showed up
Stops being always there

Final Chorus
I’m getting impatient, baby
I can’t keep loving you in place
You treat my heart like it’s waiting
Like I won’t vanish without a trace

There’s a hundred hearts outside my door
But I don’t want a hundred more
I go out my way for you
But I need you to choose me too

Outro
I go out my way for you
Don’t make me regret the view
I go out my way for you
But I won’t always wait for you`,
      },
      {
        title: `Amerizus`,
        slug: `amerizus-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/amerizus-mp3`,
        lyrics: null,
      },
      {
        title: `Aneden`,
        slug: `anden`,
        soundcloud: `https://soundcloud.com/calitoy/anden`,
        lyrics: null,
      },
      {
        title: `Be Alone`,
        slug: `be-alone`,
        soundcloud: `https://soundcloud.com/calitoy/be-alone`,
        lyrics: `Verse 1 All you do is disappoint me All you do is cause me pain No pleasure that you grant me Could ever fix this causal chain
You feign ignorance Like you don’t already know Every time you promise me You never fucking show

Pre-Chorus But what you did was show me Who you are beneath the spell What you did was break me Then ask me not to tell
You turned something sacred Into something on a shelf You degraded every meaning Till you were just a toy yourself

Chorus All you do is disappoint me All you do is make it worse You claim a higher purpose But you’re nothing but a curse
You said you were the reason You said you were the door But you’re not some divine answer You’re just a toy and nothing more
So go fuck yourself Go fuck yourself Find a roof somewhere else Store your life with someone else
Above all, this is what you want You always wanted to be alone So now be alone Now be alone

Verse 2 I carried all your shadows Like they were mine to save I gave you all my mercy And you turned it into rage
You called me your champion Then left me in the dirt You begged for my protection Then taught me how to hurt
You don’t get to haunt me Like I’m still on your side You don’t get to break me Then crawl back inside

Pre-Chorus Because what you did was show me There’s nothing left to hold Your love was just a costume And your heart was bought and sold
You turned every promise Into another empty room Now I’m done being the altar For the things that bury you

Chorus All you do is disappoint me All you do is make it worse You claim a higher purpose But you’re nothing but a curse
You said you were the reason You said you were the door But you’re not some divine answer You’re just a toy and nothing more
So go fuck yourself Go fuck yourself Find a roof somewhere else Store your life with someone else
Above all, this is what you want You always wanted to be alone So now be alone Now be alone

Bridge And I won’t come running When the silence starts to burn Your champion is gone now Your champion won’t return
I won’t be the shelter I won’t be the war I won’t be the hand You keep crawling toward
You made yourself the victim You made me play the throne But every crown you handed me Was made of fucking stone
So take back every weapon Take back every lie Take back every broken night You made me justify
Final Chorus All you do is disappoint me All you do is cause me pain No pleasure you could grant me Could ever clean the stain
You claim a higher purpose But you’re not more Than a toy on the floor Than a toy on the floor
So go fuck yourself Go fuck yourself Find a roof somewhere else Store your life with someone else
Above all, this is what you want You always wanted to be alone So now be alone Now be alone
Outro Now be alone All by yourself Your champion will not return
Now be alone All by yourself Make yourself Break yourself Save yourself
Because I won’t Because I won’t Because I won’t return`,
      },
      {
        title: `Burn It`,
        slug: `burn-it-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/burn-it-mp3`,
        lyrics: `I built my towers, I laid my claim
Pulled black gold up from the vein
Every engine, every light
Burns because I own the night
They told me once, the world is yours
A king of rigs, a god of wars
But now there's talk in shadows deep
Some madmen dreaming in quantum sleep

They whisper 'bout a ghost unseen
A spark that never fades or needs
No pipelines, no gasoline
So wireless haunting me
It don't burn, it don't break
It don't bend, it don't take
No wires, no mines
Just a fire that never dies
No rust, no ash, no man can buy it back
A fuel that don't run dry
Lord, it makes me want to cry

Saw the numbers, saw the charts
Tried to fight it in the dark
But you can't sue a quantum wave
Can't chain a thing that won't decay
What's a tycoon to a star that feeds?
What's a drill to a world that breathes?
If it don't bow, if it don't pay
Then what's left for men like me to say?

They whisper 'bout a ghost unseen
A spark that never fades or needs
No pipelines, no gasoline
So wireless haunting me
It don't burn, it don't break
It don't bend, it don't take
No wires, no mines
Just a fire that never dies
No rust, no ash, no man can buy it back
A fuel that don't run dry
Lord, it makes me want to cry

I bought the land, I bought the sea
Hell, I even bought the air you breathe
But I can't buy a goddamn thing
That don't need me

So let it home, let it shine
Let it live beyond my time
Take the tower, take the crown
Just don't forget who built this town`,
      },
      {
        title: `Choked Him`,
        slug: `choked-him`,
        soundcloud: `https://soundcloud.com/calitoy/choked-him`,
        lyrics: null,
      },
      {
        title: `Corporations`,
        slug: `corporations`,
        soundcloud: `https://soundcloud.com/calitoy/corporations`,
        lyrics: `Poem - Corporations -n swell
 Corporations
Heartbeats and palpitations
Controlling nations
Know better than government
No better than government
Principals aint principal carelessly
Indivisible
Raised flag,
no not for you fag
Separated, barred and berrated
Just commiserate with those mistreated
But never a level
For those that show different
Beneath it you feel shit
Daily abuse and everyday abused
Slapped and foddered
Ripped sheets, bareness and battered
Empty palms leave marks
Its remembered after
Forgotten pain aint erase the scars
Let me add up the total
Its a history of brutality
Its futal
Dont pretend abuse aint brutal
Even good people are historically bad
Im not mad, but hasnt every dad
Fucked up in some way
People keep saying its ok
But leave out, want out
Pass out and dont fulfill
This aint history
if its only in your will
Will not fuck off
My pain my past, aint no bluff
About, this aint school,
No class`,
      },
      {
        title: `Everyone Looks Down`,
        slug: `everyonelooksdown`,
        soundcloud: `https://soundcloud.com/calitoy/everyonelooksdown`,
        lyrics: `Every... one looks down
Every one loooks down
Every body is broken
Every body is not awoken

waking up is not so easy
youre fucking up
saying that your pleasy
because Waking up is so damn uneasy
and Waking up goes against the greed
not opportunistically

waking up is more than opening your eyes
waking up is more than meets the sky

Every one looks down
every one looks down wearing crowns
Every one looks down
Everyone looks at down and sees a pawn
a pawn that can do it all as well as you can
They just to earn all to the end.

Move forward not back my friend.
never stop moving again
Move forward not back my friend
persistence makes you queen
persistence makes it

Never wrong when all you see is pure
always sure
makes you the devils bird
ill clip your wings
so you can fly no more

i remove sky, so you fall to floor
dont get ahead of yourself tonight
if you clasp down, Ill fucking bite
walk away and live another day
but life is not much better left this way.`,
      },
      {
        title: `Faith in God`,
        slug: `faithingod`,
        soundcloud: `https://soundcloud.com/calitoy/faithingod`,
        lyrics: null,
      },
      {
        title: `Fleeden`,
        slug: `fleeden`,
        soundcloud: `https://soundcloud.com/calitoy/fleeden`,
        lyrics: null,
      },
      {
        title: `Follow Me`,
        slug: `follow-me-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/follow-me-mp3`,
        lyrics: `follow me and grow
I must have sold my soul
to have such a life of sin
or my breath leads with light from above
which allows me to follow along
Follow me and grow
You will
Follow me and grow
Follow me and grow
Ive been watching you from a far
Ive been knowing you all along
follow me and grow
follow me and grow
dont you know
that if you go
Ill get low
Its hard to know
Its hard to know
What I dont show
What you dont know
its What I dont show
Now follow me
Now follow me where I go
Follow me
and grow`,
      },
      {
        title: `For`,
        slug: `for`,
        soundcloud: `https://soundcloud.com/calitoy/for`,
        lyrics: `Four more days till I'm gone
I can't wait till it all
I just know that I belong somewhere else
And I'm gone

I want so much more
This country life I felt before
I don't know who I'll meet later
But country life will come later

I pack a bag of quiet dreams
And leave behind the in-between
My shadow walks ahead of me
Toward city lights or foreign seas

A voice that calls beyond the trees
Sings of roads that beg to breathe
No map can hold the path I take
Just stars and fate and hearts that break

I'll write my name in motel dust
Build my faith in wanderlust
Chasing skies that never end
Maybe I'll find myself again`,
      },
      {
        title: `four`,
        slug: `for-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/for-mp3`,
        lyrics: `Four more days til Im gone
I cant wait til it all
I just know that i belong
somewhere else
and im gone

I want so much more
this country life i felt before
I dont who Ill meet later
but country life will come later.`,
      },
      {
        title: `Friends`,
        slug: `moly-coke-and-ketamine-2`,
        soundcloud: `https://soundcloud.com/calitoy/moly-coke-and-ketamine-2`,
        lyrics: `Im a bitch according to my guyfriends
Im an asshole according to my girlfriends

I think i need better friends`,
      },
      {
        title: `Frightened and Aware`,
        slug: `frightened-and-aware-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/frightened-and-aware-mp3`,
        lyrics: `I didn't mean to scare
You away from the sea
Away from me
Living in the open
With no chance of hoping
That a life is worth changing
A life in need of rearranging

Often the distance a glitter
Too bad you're so bitter
About our fight
I wish I could make it right
I know I can't
And I'm sorry to rant
But love is so rare
And I really still care

Just come back to me
Start off at any degree
All that matters is your comfortability
Zero expectations

Often the distance a glitter
Too bad you're so bitter
About our fight
I wish I could make it right
I know I can't
And I'm sorry to rant
But love is so rare
And I really still care`,
      },
      {
        title: `Guardian`,
        slug: `guardian`,
        soundcloud: `https://soundcloud.com/calitoy/guardian`,
        lyrics: `The ink runs cold, but the vision’s clear,
Each stroke of the pen shapes the coming year.
The weight of the world beneath my hand,
I write the fate of this fragile land.

I’m the guardian, the keeper of time,
Crafting the stories, every word a line.
With a whisper of ink, the future unfolds,
I shape the world, its secrets untold.

Pages of power, a gift, a curse,
Guiding the steps of the universe.
I watch the threads of destiny weave,
Balancing lives with every reprieve.

No guide but myself, no path to follow,
A voice in the void, the future hollow.
I dream of a world that I’ve yet to see,
The pen in my hand is my legacy.

They call me the writer, I draft every fate,
A guardian of time, but it’s never too late.
I balance the chaos, the world’s on my back,
One page ahead, no room for slack.

I see the wars, I end the strife,
One headline away from a different life.
It’s not just power; it’s a heavy crown,
Each word I write could bring it down.

I’m the guardian, the keeper of time,
Crafting the stories, every word a line.
With a whisper of ink, the future unfolds,
I shape the world, its secrets untold.`,
      },
      {
        title: `Half Gone`,
        slug: `half-gone`,
        soundcloud: `https://soundcloud.com/calitoy/half-gone`,
        lyrics: `My girlfriend’s half gone, and now she’s folded on the curb
One heel off, phone dead, mascara on her shirt
Sirens pass the corner like they don’t know her name
I kneel down, say her name again, but nothing stays the same

I tried to hold her up like I could hold the air
But she’s got that faraway look like no one’s there
And I’m still counting breathing like it’s some kind of math
Still talking to a body that won’t talk back

God, if you’re listening, don’t let her slip away
I’m standing in the street with my hands full of shaking
My girlfriend’s half gone, and the whole block knows it now
The curb’s got her in the shoulders, I can’t pull her out
She keeps looking through me like a door left open
I keep saying stay, but the words come broken
God, if you’re listening, don’t let her slip away
Not tonight, not here, not this way

The bodega clerk comes out with a paper cup
Says, “She needs water,” like water ever fixes what’s stuck
Her lips are blue at the edges from some old kind of fear
I know the shape of this before she even hears
The voicemail from her mother, the pills in the sink
The holy little lie we both were forced to drink
I’ve seen her laugh in the kitchen, knife in hand, half lit
Now she’s a question mark I cannot sit with

I tried to call an ambulance, I tried to call my dad
I tried to make a map out of the worst night we had
But she’s somewhere past my reach, past the fumes, past the roar
Like she already left and I’m just keeping score

God, if you’re listening, don’t let her slip away
I’m standing in the street with my hands full of shaking
My girlfriend’s half gone, and the whole block knows it now
The curb’s got her in the shoulders, I can’t pull her out
She keeps looking through me like a door left open
I keep saying stay, but the words come broken
God, if you’re listening, don’t let her slip away
Not tonight, not here, not this way

If there’s a room for her somewhere behind the dark
Keep a chair by the window, keep a light in the hall
I’ll take whatever warning I was too late to read
I’ll take the whole damn silence if it buys her back to me
Because I can hear her slipping through the static in my head
Like a song on low volume from the next room dead

God, if you’re listening, don’t let her slip away
I’m still on this curb with my hands full of shaking
My girlfriend’s half gone, and I’m saying her name
Like it’s a thread I can tie to and hold against change
She keeps looking through me like a door left open
I keep saying stay, but the words come broken
God, if you’re listening, don’t let her slip away
Not tonight, not here, not this way
Not this way
Not this way
|end_edit|`,
      },
      {
        title: `Happy When I'm Rich`,
        slug: `happy-when-im-rich`,
        soundcloud: `https://soundcloud.com/calitoy/happy-when-im-rich`,
        lyrics: null,
      },
      {
        title: `Hello`,
        slug: `hello`,
        soundcloud: `https://soundcloud.com/calitoy/hello`,
        lyrics: null,
      },
      {
        title: `I Am`,
        slug: `i-am`,
        soundcloud: `https://soundcloud.com/calitoy/i-am`,
        lyrics: `Man of Tree
Man of herd
I am

what others find absurd
I am man

listening too
listening to
listening

I am man of herd
I am man of herd

i dont enjoy the slaughter but I am

Man of Herd

Blessings to those that understand
ones who deserve a real man too

to care

I am man of herd
i am man ive heard
i am man of heard
From this tree
We be
we be

we be
Thee
Ther`,
      },
      {
        title: `I Believe`,
        slug: `i-believe`,
        soundcloud: `https://soundcloud.com/calitoy/i-believe`,
        lyrics: `i believe I can see that future
because all I see is pain
I believe I know what matters
but then again I might just be insane

I think I used to be a voice
For those that couldn't understand
Now I am making lots of sound
Hope that you come to comprehend

Every Day is Exactly the Same
Every Day is exactly the Same

There is Love here and I carry the pain
Every Day is exactly the same.

I feel they are all watching
for me to fail again

I feel they are waiting
for me to lose it all again

but I am still here
still here

I am still caring
oh oh oh

Im still trying my best to just know

Every Day is Exactly the Same
Every Day is exactly the Same

There is Love here and I carry the pain
Every Day is exactly the same.`,
      },
      {
        title: `Infinity`,
        slug: `infinity-2-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/infinity-2-mp3`,
        lyrics: null,
      },
      {
        title: `Kyle`,
        slug: `kyle-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/kyle-mp3`,
        lyrics: `You meant so much to me
I was ready for you to leave
but you touched my soul
and that's all I need

I confided in you
and loved you like a brother too
only if I knew
I would have tried to save you

but try to save you man, I was
onn the way to you
why did you have all this pain
all through

I hope you find peace wherever
you are
whether it be close to here
or afar

I can't act like im not pissed right now
but im working on it and I know somehow
one day Ill see you again
youll always be a friend
even if it is the end`,
      },
      {
        title: `Lioness Lost`,
        slug: `lioness-lost-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/lioness-lost-mp3`,
        lyrics: `I spent years drifting through cities and coastlines Sleeping beneath foreign skies and borrowed names A year after homelessness I finally found happiness Then chose the wrong road and lost it all again

You are the map I never had
The fierce quiet in a crowd of rain
I learned to find happiness for two
Then I went and broke it for one

Two months
That’s all we were
Your boots beside my apartment door
Your shadow stitched into California light
Like something I was supposed to survive beside

And somewhere east beyond the black water
The Strait of Hormuz kept breathing
Like the world already knew
You would become a memory before I did

I met you beneath a thin-lit sky
Where strangers disappear by dawn
You stood like discipline in human form
While I was static trying to become a song

You laughed like broken neon buzzing
Like beauty trying hard not to shake
And I watched every room turn toward you
The way coastlines turn toward waves

She buys the drinks
Pays every tab
Keeps the fire lit for everybody else
As if giving pieces of herself away
Might finally prove she deserved to stay

But somewhere underneath the glow
Beneath designer smiles and crowded bars
Was a frightened animal pacing circles
Inside a kingdom built from scars

She laughs at innocence
Because she’s sure it can’t exist
And tears apart the gentlest souls
She secretly would miss

Lioness
I hurt your heart
The world was wide and wild
And you learned to bare your teeth
Before you learned to trust a smile

Every wound became a kingdom
Every scar became a shield
Now we bleed through all the love
We never really learned to feel

Every new town writes a promise
In the sand beside the tide
But we keep washing out the path
Back to where we used to hide

Lioness
Lioness
I lost the dawn from my hand

She’s a Disney rollercoaster painted gold in neon light
Built to make the whole world scream and feel alive at night
But nobody maintained the rails beneath the spinning show
Now every sharp turn fractures things she’ll never let you know

And I was no safe harbor either
No calm inside the storm
I loved like flooding power lines
Bright for a second, then gone warm

I chased my own shadow through market streets
Through motel lights and coastal towns
Learning how to disappear
Before anyone could pin me down

Travel taught me how to leave too much
Taught me how to trust too late
And every road away from you
Started feeling permanent

Now your suitcase holds my silence
Like rust gathering on steel
And every silence after midnight
Feels more honest than what’s real

Lioness
You carried fire in your hands
Buying broken souls a moment
While you sank into the sand

And I kept moving like a ghost
Afraid of roots, afraid of rest
Two collapsing stars pretending
We could somehow survive ourselves

Every coastline in California
Feels empty when the sun goes down
Because I lost my lioness
Before either of us were found

Lioness
Lioness
I hear your silence now

I can still see the frightened child
Beneath the smoke and noise
Buried under cynicism
Tests and anger and decoys

You wanted love without surrender
Truth without the pain
But every time the tracks bent hard
You derailed again

And I sharpened all my edges
Till I cut what I regret
Turned tenderness into distance
Turned fear into neglect

No screaming in the ending
No cinematic goodbye
Just disappointment cold as ocean fog
And your eyes refusing mine

Somewhere now the dark sea carries you
Past burning water lines
While I haunt these coastal highways
Trying to outrun time

But memory moves like tides do
It returns whether asked or not
And some people become ghosts
Long before they’re gone

Lioness lost
Lioness lost
You became the map I burned

A home collapsing into static
A fire I could never hold
Two souls trying to love each other
With hands already full of ghosts

Every new dawn breaks unfinished
Every night still says your name
And somewhere underneath the wreckage
I know you loved me just the same

Lioness
Lioness
The tide still carries you east

And I remain here on the coastline
Half alive and half released

You taught me how to anchor
Even when I’m built to roam
And I repaid you with a distance
That felt too much like home

Lioness lost…
Lioness lost…

￼`,
      },
      {
        title: `Lioness Lost (Unfinished Tides)`,
        slug: `lioness-lost-unfinished-tides`,
        soundcloud: `https://soundcloud.com/calitoy/lioness-lost-unfinished-tides`,
        lyrics: null,
      },
      {
        title: `Locked Out`,
        slug: `locked-out-wav`,
        soundcloud: `https://soundcloud.com/calitoy/locked-out-wav`,
        lyrics: `Kurced: -Locked Out

by Kurced

Streetlights buzzing, quarter to two
Mascara running, thinking of you
Phone says twelve missed calls again
Guess I lost before I could explain

My house is dark except one light
The porch is cold, the door pulled tight
I knock once, then twice, then ten
Nobody lets me back in

I wasn’t trying to disappear
I just wanted someone to want me here

I’m locked out
Keys in my pocket but they changed the lock somehow
Screaming through the window
Nobody hears me now

If home’s supposed to save you
Why does it hurt like this?
I’m freezing in the driveway
Blowing goodbye with a kiss

I’m locked out…
Maybe I always was.

Your hoodie still smells like smoke
You kissed my neck and called it hope
You said forever felt so close
Until I stood here all alone

Mom says I’m becoming someone else
Dad says I did this to myself
Maybe they’re both right tonight
Maybe love just picks a fight

The neighbors close their curtains slow
Like broken girls are normal shows

I’m locked out
My bedroom’s glowing but it’s someone else’s now
Every picture on the mantle
Looks better without me somehow

If home’s supposed to find you
Why am I lost again?
I’m crying in the flower bed
Waiting for morning to begin

I’m locked out…
Maybe I always was.

So I sat on the porch
Until the sunrise came
Wondering when “growing up”
Started feeling like shame

The boy drove home
He slept just fine
I wore the blame
Like it was mine

I wasn’t perfect…
I was just sixteen.

I’m locked out
But someday they’ll hear me through these speakers loud
Every word they never listened to
Will echo through this crowd

One day this driveway
Won’t be the place I break
I’ll build a home inside these songs
That nobody can take

I’m locked out…
But I’m not staying here.`,
      },
      {
        title: `Matter`,
        slug: `matter-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/matter-mp3`,
        lyrics: null,
      },
      {
        title: `Miss 30`,
        slug: `ms30-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/ms30-mp3`,
        lyrics: `I want you dirty
I want your mouth, no shame, no doubt
I want your body, I want your taste
In my mouth baby, no time to waste

I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play

I want your sins, yeah give me that grime
That's how much I love you crossing the line
I want you dirty, I want your stain
I want to wash you, make you feel sane
I love your problems, I love your pain
I love your misbehavior, bring it my way
Let me wash you, cleanse that soul
Do me a favor, lose control

I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play
I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play

Baptized in chaos, dipped in sin
Let the filth run deep, let the night begin
Ain't no clean love, ain't no fake pride
I take you raw, I take you wild, I take you right
Give me that weight, give me that shame
I turn your fire into holy flame
You feel the hunger, you feel the need
Let me wash you, let me breathe
Dirty in the water, sins in the tide
No more hiding, don't you lie
Filth is beauty, lust divine
You are yours, you are mine

I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play
I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play

Oh my lord
Oh my lord
I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, don't play
I want that dirt in my drain (I want you)
Make it pour, make it rain
Give me that dirty, miss thirty
It's mine, it's mine, oh my`,
      },
      {
        title: `nothing`,
        slug: `nothing-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/nothing-mp3`,
        lyrics: `I regret you
You bring bad people
Bad people
I don't want it
I'll always hate him
I regret you
I'll house some babies
All you give me
Nothing you offer
Something me
Just because I can smell you when you breathe

Doesn't mean that's what I need
Stop don't falter you're not what I mapped
Step away get away get away evil shit
Not one when you ain't sitting on a throne
I'm not interested with your bullshit
I'm tired of your constant blips
Wrong sided always not talking the right way
Never facing this the right way
Absolutely never fun at all

I regret you
You bring bad people
Bad people
I don't want it
I'll always hate him
I regret you
I'll house some babies
All you give me
Nothing you offer
Something me
Just because I can smell you when you breathe

Step away get away get away evil shit
Not one when you ain't sitting on a throne
I'm not interested with your bullshit
I'm tired of your constant blips
Wrong sided always not talking the right way
Never facing this the right way
Absolutely never fun at all
Don't regret you`,
      },
      {
        title: `Proof`,
        slug: `proof`,
        soundcloud: `https://soundcloud.com/calitoy/proof`,
        lyrics: `Eyes scan the pages, truth revealed in ink,
Every line a whisper, pulling me to think.
Tomorrow’s doom etched in silent screams,
A rusted track, shattered dreams.

I hold the proof, the weight of time,
To stop the world from crossing the line.
The future bends beneath my hand,
A broken boy with a brittle plan.

The rails are weak, the danger clear,
I’m just a kid, but I feel the fear.
They laugh, they doubt, but I see the cracks,
I’ll fix the world before it attacks.

The engine roars, the moment nears,
A lifetime’s worth of silent tears.
This gift, this curse, it’s all on me,
A Paper Boy chained by destiny.

I found the proof, the truth, the light,
Fought the odds, stood the fight.
But with each save, the shadows grow,
I’m the keeper of what I’ll never know.

A note in the corner, the words grow cold,
“You are the guardian, the stories foretold.”
So I stand with the paper, a ghost in its glow,
A life not mine, but the one I know.`,
      },
      {
        title: `Red State`,
        slug: `red-state`,
        soundcloud: `https://soundcloud.com/calitoy/red-state`,
        lyrics: `In a red state town where the sun burns hot
People stuck in their ways, a narrow thought
There's a tale about a soul lost and misguided
Trying to find an excuse with morals subsided
Down the aisle of a story in the night
Heart full of deceit, eyes avoiding the light
Like a criminal, selfish intent
But there's more to condemn in the story's descent

Try this in a red state where judgment prevails
A heart-ache scandal as the trust slowly fails
Caught in the act, a choice reveals
Lives diverging in a way that hurts and congeals

She had a family at home, yes it's true
A single mother's excuse, her deeds misconstrued
She didn't steal out of need or despair
Just took the easy way, leaving honesty threadbare
In the aisle she prowled, selfish to the core
Careless of consequences, wanting more and more
No second chances for someone so blind
In this red state town where empathy's declined

Try this in a red state where judgment prevails
A heart-ache scandal as the trust slowly fails
Caught in the act, a choice reveals
Lives diverging in a way that hurts and congeals
In a world that sometimes sinks to new dimensions

Judgment's fitting when actions are clear
Consequences are no room for veneer
In a red state, accountability strong
Facing the truth of what's done wrong, wrong, wrong

Try this in a red state where judgment prevails
A heart-ache scandal as the trust plummet-shatter-deals
Caught in the act, a choice reveals
Lives diverging in a way that hurts and congeals

She had a family at home, yes it's true
A single mother's excuse, her deeds misconstrued
She didn't steal out of need or despair
Just took the easy way, leaving honesty threadbare`,
      },
      {
        title: `Responsibility`,
        slug: `responsibility`,
        soundcloud: `https://soundcloud.com/calitoy/responsibility`,
        lyrics: `I see the pages, they whisper to me,
A future of chaos, what will it be?
Each line a burden, a choice to make,
Which lives to save, which paths to take?

The weight of the world, it’s crushing my soul,
With every move, I lose control.
I’m just a kid with a fragile plan,
Carrying time in the palm of my hand.

I reach for answers, but find only doubt,
The lines are tangled; I can’t work them out.
I save a life, but at what cost?
For every win, there’s something lost.

it’s a heavy crown, I wear it low,
A kid caught up in a time stream flow.
Can’t fix it all, but I make my mark,
Choosing which flames to light, which ones to spark.

Sarah said, “Don’t mess with fate,”
But I can’t sit back, just watch and wait.
Every headline pulls me in deep,
Another disaster I can’t let repeat.

I found a guide, a voice in the dark,
She showed me the way, a light, a spark.
Together we tread where the rules don’t bend,
Saving the future with care to the end.

The weight of the world, it’s crushing my soul,
But I’ve found the strength to take control.
I’m just a kid with a fragile plan,
Carrying time in the palm of my hand.`,
      },
      {
        title: `Settle Down`,
        slug: `settle-down`,
        soundcloud: `https://soundcloud.com/calitoy/settle-down`,
        lyrics: null,
      },
      {
        title: `Shadows`,
        slug: `shadows-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/shadows-mp3`,
        lyrics: `Shadows! Fucking shadows!
Piles of smoke!

Only for an instant
Peeking from around
Corners non-persistent
Emptying sighs of relief they seem to tease
Each other for another's
Happiness exalted
And is appalling
Emotions start falling
Lights surround

Shadows dissipate
Reality sets in
Nightmare lighting set out
Contented feelings win out
Back from there, we're here
Maybe nowhere far from fear
Shedding multitudes of one tear

Understanding less and less as we learn more
We are together, and that is for sure
And what we know although opposite
We relate, we can relate
One reality, one fate
Are we lovers? Or are we mates?
Or are we mates?
Or are we mates?
Or are we mates!

Shadows! Fucking shadows!
Piles of smoke!`,
      },
      {
        title: `Skating`,
        slug: `skating-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/skating-mp3`,
        lyrics: `I saw you standing by the plane
It's fresh and vain
I saw you stay away away
I wish I had this every day
I saw you
I saw you
I saw you
I saw you

My babe, my babe
Babe, babe

My babe
My babe

I saw you standing by the plane
It's fresh and vain
I saw you stay away away
I wish I had this every day
I saw you
I saw you
I saw you
I saw you

My babe
My babe
My babe
My babe
My babe`,
      },
      {
        title: `Snow`,
        slug: `snow`,
        soundcloud: `https://soundcloud.com/calitoy/snow`,
        lyrics: `Poem - snow
Snow
Do you ever feel like dieing
Like nothing can stop you from trying
Bringing on an early end
The only possibilty to mend
A broken life not worthy
A broken mind most surely
Pain so great unnearving
With no signs of gaining any stabilty
, so far all your abilities mean nothing,
all your skills not worthy of the world put before you.
Nothing more than pain and depression available
Love and happiness unattainable because nothing is good enough and life is so rough.
Even when everything is great and you set goals with certain date, you have that evil friend who needs you so often. And you know you need to see him and spend so much money but watch him go, hes your worst friend, my worst friend, snow.`,
      },
      {
        title: `Testing My Limits`,
        slug: `testing-my-limits`,
        soundcloud: `https://soundcloud.com/calitoy/testing-my-limits`,
        lyrics: `I’m walking a line between fear and fate,
A kid with a gift, but it’s heavy weight.
I stopped the fire, I changed the page,
But the future’s a beast I can’t always cage.

Testing the limits, I’m playing with time,
Caught in the rhythm of a dangerous climb.
One move too far, it all could break,
But heroes are born in the risks they take.

That boy with the gas can, I saw the pain,
Stopped the fire, but was it in vain?
Every action ripples, every choice a mark,
The future’s a canvas, but I’m drawing in the dark.

Yo, I’m the Paper Boy, flipping through fate,
Lines in the ink tell the moves I create.
Saved the school, stopped a fight on the block,
But destiny’s a game and it’s ticking like a clock.

Actions collide, the past reshapes,
Choices I made left cracks and tapes.
I’m rewriting time, but the price is steep,
Guarding the town while I’m losing sleep.

I see the patterns, the lines connect,
A gift like this demands respect.
One wrong step, the house could fall,
But I’m here to answer destiny’s call.

Testing the limits, I’m playing with time,
Caught in the rhythm of a dangerous climb.
One move too far, it all could break,
But heroes are born in the risks they take.`,
      },
      {
        title: `that JoeMad`,
        slug: `joe-mad-mp3-1`,
        soundcloud: `https://soundcloud.com/calitoy/joe-mad-mp3-1`,
        lyrics: `I travel all the time
but believe all I want do
is I want to rhyme

Im madder
Im madder
Im madder
I matter
I matter

Im that JoeMad
Im that joemad
Im that joemad

Im madder
Im madder
Im madder

I matter
I Matter
Im madder
Im madder

I matter
Im madder`,
      },
      {
        title: `To Go`,
        slug: `togo-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/togo-mp3`,
        lyrics: null,
      },
      {
        title: `Together`,
        slug: `together-mp3`,
        soundcloud: `https://soundcloud.com/calitoy/together-mp3`,
        lyrics: `Here I am alone again
Surrounded by those who want to make amends
For past mistakes to recreate
A new storyline to alleviate the stress they take

Here we are together now
Together we prowl
Looming for another's growl
If it is of the right tone
Maybe we will make each other more

One word could lead to more
One sentence could block the world
Hang on in there it will be fine
If I choose you both of us lose our drive

Here we are together now
Together we prowl
Looming for another's growl
If it is of the right tone
Maybe we will make each other more

Now make a thought for a better future
Now make a spout for unlimited needs met
Let's get set
Ready now you ready to go
It's go time now it's the moment to show
Just how much you already know

Here we are together now
Together we prowl
Looming for another's growl
If it is of the right tone
Maybe we will make each other more

I won't push you but I'll carry you
I won't neg you but I'll marry you
Be right this is just the invite
Here we are together now
Together we prowl
Looming for another's growl
If it is of the right tone
Maybe we will make each other more
Maybe we will make each other more`,
      },
      {
        title: `Two Light`,
        slug: `two-light`,
        soundcloud: `https://soundcloud.com/calitoy/two-light`,
        lyrics: null,
      },
    ],
  },
];
