<script setup>
// Genera los horarios dinámicamente basándose en el día actual
const generateSchedule = () => {
  const today = new Date()
  const currentDay = today.getDay() // 0 = domingo, 1 = lunes, ..., 6 = sábado
  
  const daysOfWeek = [
    { name: 'Domingo', hours: 'Cerrado', closed: true },
    { name: 'Lunes', hours: '8:30 a.m. – 6:30 p.m.', closed: false },
    { name: 'Martes', hours: '10:00 a.m. – 6:30 p.m.', closed: false },
    { name: 'Miércoles', hours: '8:30 a.m. – 6:30 p.m.', closed: false },
    { name: 'Jueves', hours: '10:00 a.m. – 6:30 p.m.', closed: false },
    { name: 'Viernes', hours: '8:30 a.m. – 6:30 p.m.', closed: false },
    { name: 'Sábado', hours: 'Sábado por medio', closed: false }
  ]
  
  return daysOfWeek.map((day, index) => ({
    ...day,
    today: index === currentDay
  }))
}

const schedule = generateSchedule()

// Mes y año actual dinámico
const currentMonthYear = computed(() => {
  const today = new Date()
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return `${months[today.getMonth()]} ${today.getFullYear()}`
})
</script>

<template>
  <section id="horarios" class="py-32 bg-white">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="reveal">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-[1px] bg-black"></div>
            <span class="font-mono text-[10px] tracking-[0.2em] text-forest-700 uppercase font-semibold">Visítanos</span>
          </div>
          <h2 class="font-display text-6xl md:text-7xl font-medium text-black leading-[0.9] tracking-tight mb-8">
            Horarios de<br><span class="italic text-forest-800">atención</span><span class="text-ember-500">.</span>
          </h2>
          <div class="aspect-[4/3] rounded-[2rem] overflow-hidden img-zoom mb-8">
            <NuxtImg src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80" alt="Cafetería" class="w-full h-full object-cover" />
          </div>
          <div class="flex items-center gap-4 p-5 bg-forest-900 text-white rounded-2xl">
            <i class="fa-solid fa-location-dot text-2xl text-ember-400"></i>
            <div>
              <div class="font-display text-lg">Talca, Chile</div>
              <div class="text-sm text-white/70">Región del Maule</div>
            </div>
          </div>
        </div>
        
        <div class="reveal" style="transition-delay: 0.15s">
          <div class="bg-forest-50 rounded-[2rem] p-8 md:p-12">
            <div class="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
              <div>
                <div class="font-mono text-[10px] text-black/50 uppercase tracking-wider mb-1">Semana actual</div>
                <div class="font-display text-3xl text-black">{{ currentMonthYear }}</div>
              </div>
              <div class="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
                <i class="fa-regular fa-clock text-2xl"></i>
              </div>
            </div>
            <div class="space-y-0">
              <div 
                v-for="(day, idx) in schedule" 
                :key="idx" 
                :class="['hours-row flex items-center justify-between py-5 px-4 rounded-xl', day.closed ? 'opacity-40' : '']"
              >
                <div class="flex items-center gap-4">
                  <div :class="['w-2.5 h-2.5 rounded-full', day.closed ? 'bg-black/20' : (day.today ? 'bg-ember-500 animate-pulse' : 'bg-forest-700')]"></div>
                  <span :class="['font-display text-xl', day.today ? 'text-forest-900 font-semibold' : 'text-black']">
                    {{ day.name }}
                  </span>
                  <span v-if="day.today" class="font-mono text-[9px] bg-ember-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                    HOY
                  </span>
                </div>
                <span :class="['font-mono text-sm', day.closed ? 'text-black/40' : 'text-black/70']">
                  {{ day.hours }}
                </span>
              </div>
            </div>
            <div class="mt-10 pt-8 border-t border-black/10 text-center">
              <p class="font-display text-3xl italic text-forest-800">¡Te esperamos!</p>
              <p class="font-mono text-xs text-black/60 mt-2">Sábados por medio · Domingos cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hours-row { transition: all 0.3s ease; }
.hours-row:hover { background: #F4F9F5; padding-left: 20px; }
</style>