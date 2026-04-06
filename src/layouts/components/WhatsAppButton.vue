<template>
  <v-btn
    class="text-label-medium"
    variant="tonal"
    prepend-icon="mdi-phone-outline"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    Comunícate por WhatsApp
  </v-btn>
</template>
<script setup lang="ts">
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;
  const message =
    '¡Buen día! \n\nEstoy interesado en alquilar equipo médico a través de su plataforma. **¿Podrían proporcionarme más información sobre los servicios que ofrecen, los tipos de equipos disponibles?**';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
</script>
