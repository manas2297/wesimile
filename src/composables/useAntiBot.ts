import { ref, onMounted } from 'vue'

/**
 * useAntiBot — provides two passive bot-detection techniques:
 *
 * 1. Honeypot field: a hidden input that only bots fill in.
 *    Bind `:value="honeypot"` + `@input="honeypot = ($event.target as HTMLInputElement).value"`
 *    on a visually hidden input in your form template.
 *
 * 2. Timing check: records the timestamp when the composable is mounted (i.e. when the form
 *    renders). A real human takes at least MIN_FILL_SECONDS to fill a form; a bot usually
 *    submits instantly.
 */

const MIN_FILL_SECONDS = 4 // reject submissions faster than this

export function useAntiBot() {
  const honeypot = ref('')
  const formMountedAt = ref<number>(0)

  onMounted(() => {
    formMountedAt.value = Date.now()
  })

  /**
   * Returns null if the submission looks legitimate.
   * Returns an error string if a bot is detected.
   */
  const checkBot = (): string | null => {
    // 1. Honeypot check — real users never fill the hidden field
    if (honeypot.value.trim().length > 0) {
      return 'Submission rejected.'
    }

    // 2. Timing check — real users take more than MIN_FILL_SECONDS to fill the form
    const elapsedSeconds = (Date.now() - formMountedAt.value) / 1000
    if (formMountedAt.value > 0 && elapsedSeconds < MIN_FILL_SECONDS) {
      return 'Submission rejected. Please take a moment to fill in the form.'
    }

    return null
  }

  return {
    honeypot,
    checkBot,
  }
}
